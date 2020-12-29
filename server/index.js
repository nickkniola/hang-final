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
  const city = req.body.city.replaceAll(' ', '+');
  const state = req.body.state.replaceAll(' ', '+');
  const activityType = req.body.activityType;
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
        res.json(result.rows);
        return;
      }
      const neighborhood = req.body.neighborhood.replaceAll(' ', '+');
      const preferredActivity = req.body.preferredActivity.replaceAll(' ', '+');
      const requestSearchText = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${preferredActivity}+${activityType}+in+${neighborhood}+${city}+${state}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
      return fetch(requestSearchText)
        .then(response => response.json())
        .then(data => {
          const arr = data.results;
          const location = arr.find(location => location.business_status === 'OPERATIONAL' && location.rating >= 4);
          if (!location) {
            res.json({});
            return;
          }
          res.json(location);
        });
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
