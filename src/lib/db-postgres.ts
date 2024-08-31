// require('dotenv').config();
import pgPromise from 'pg-promise';

const pgp = pgPromise({
  /* options */
});

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'dev',
  user: 'postgres',
  password: 'docker',
  max: 30,
};

export const db = pgp(cn);

// export default db;
