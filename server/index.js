require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const fetch = require('node-fetch');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.post('/api/activities', (req, res, next) => {
  let preferredActivity = req.body.preferredActivity;
  let activityType = req.body.activityType;
  const neighborhood = req.body.neighborhood.replaceAll(' ', '+');
  const city = req.body.city.replaceAll(' ', '+');
  const state = req.body.state.replaceAll(' ', '+');
  if (!activityType) {
    const activityTypes = ['Food', 'Museum', 'Sports'];
    const randomIndex = Math.floor(Math.random() * 3);
    activityType = activityTypes[randomIndex];
    preferredActivity = activityTypes[randomIndex];
  } else {
    preferredActivity = req.body.preferredActivity.replaceAll(' ', '+');
  }
  const sql = `
    select *
      from "Activities"
      join "activityTypes" using ("activityTypeId")
      join "Users" using ("hostId")
      where "Activities"."guestId" is NULL
      and "googlePlacesLink" ilike '%' || $1 || '%'
      and "googlePlacesLink" ilike '%' || $2 || '%'
      and "label" = $3
      order by random();
  `;
  const params = [city, state, activityType];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length) {
        res.json({ activityObject: result.rows[0], activityType: activityType });
        return;
      }
      const requestSearchText = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${preferredActivity}+${activityType}+in+${neighborhood}+${city}+${state}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
      return fetch(requestSearchText)
        .then(response => response.json())
        .then(data => {
          const arr = data.results;
          const locationsFiltered = arr.filter(location => location.business_status === 'OPERATIONAL' && location.rating >= 4);
          if (locationsFiltered.length === 0) {
            res.json({});
            return;
          }
          const location = locationsFiltered[Math.floor(Math.random() * locationsFiltered.length)];
          const googlePlacesLink = requestSearchText.split('&key=')[0];
          fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_PLACES_API_KEY}&placeid=${location.place_id}`)
            .then(response => response.json())
            .then(data => res.json({ responseLocation: location, activityType: activityType, mapUrl: data.result.url, googlePlacesLink: googlePlacesLink }));
        });
    })
    .catch(err => next(err));
});

app.post('/api/activity', (req, res, next) => {

  const activityType = req.body.activityType;
  let activityTypeId = null;
  if (activityType === 'Food') {
    activityTypeId = 1;
  } else if (activityType === 'Sports') {
    activityTypeId = 2;
  } else if (activityType === 'Museum') {
    activityTypeId = 3;
  }
  const sql = `
    insert into "Activities" ("googlePlacesLink", "activityTypeId", "specificActivity", "location", "date", "time", "hostId", "externalGoogleMapsUrl")
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;
  const params = [req.body.googlePlacesLink, activityTypeId, req.body.preferredActivity, req.body.responseLocation.name, req.body.date, '1PM', 3, req.body.externalGoogleMapsUrl];
  db.query(sql, params)
    .then(result => res.json())
    // finish with response to database
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
