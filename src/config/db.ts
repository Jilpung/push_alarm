import mysql from 'mysql2/promise';
import 'dotenv/config';

const iwill = {
  host: '127.0.0.1',
  database: 'iwill',
  user: 'root',
  password: 'Josh123!',
  multipleStatements: true,
};

const pool = mysql.createPool(iwill);

export { pool };
