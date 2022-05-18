const { Pool } = require('pg');
const db = require('./db');
const config = require('./config');
const helper = require('./helper');
const pool = new Pool(config.db);
const updateData = require('./data');
const format = require('pg-format');

async function runQuery() {

  // Create Temp Table
  await db.query(format(`CREATE TEMP TABLE temp_user (id integer, age integer)`));
  await db.query(format('INSERT INTO temp_user (id, age) VALUES %L', updateData.data));

  await db.query(`UPDATE users AS u 
                  SET age = tu.age
                  FROM temp_user AS tu
                  WHERE u.id = tu.id `);
}

runQuery();