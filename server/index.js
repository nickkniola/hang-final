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
      and "label" = $3;
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
          res.json({ responseLocation: location, activityType: activityType });
        });
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
