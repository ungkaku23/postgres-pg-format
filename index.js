const { Pool } = require('pg');
const db = require('./db');
const config = require('./config');
const helper = require('./helper');
const pool = new Pool(config.db);
const updateData = require('./data');
const format = require('pg-format');

async function runQuery() {
  let data = await db.query(format('UPDATE users AS u SET age = t2.age FROM (SELECT id::int, age::int FROM (VALUES %L) AS t(id, age)) AS t2 WHERE t2.id = u.id', updateData.data));
  console.log(helper.emptyOrRows(data));
}

runQuery();