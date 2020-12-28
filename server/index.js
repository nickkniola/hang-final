require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.post('/api/activities', (req, res, next) => {
  console.log('req.body', req.body);
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
      console.log(result.rows);
      if (result.rows.length) {
        console.log('res.json(result.rows)');
        res.json(result.rows);
        return;
      }
      // fetch
      console.log('fetch');
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
