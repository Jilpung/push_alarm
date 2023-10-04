// import mysql from 'mysql2/promise';
// import 'dotenv/config';

// const iwill = {
//   host: '127.0.0.1',
//   database: 'iwill',
//   user: 'root',
//   password: 'Gkskslachlrh123!',
//   multipleStatements: true,
// };

// async function connectToDatabase() {
//   try {
//     const db = await mysql.createConnection(iwill);
//     console.log('MySQL2 연결 성공!');
//     return db;
//   } catch (err) {
//     console.error('MySQL2 연결 실패:', err);
//     throw err;
//   }
// }

// export { connectToDatabase };

import mysql from 'mysql2/promise';
import 'dotenv/config';

const iwill = {
  host: '127.0.0.1',
  database: 'iwill',
  user: 'root',
  password: 'Gkskslachlrh123!',
  multipleStatements: true,
};

const pool = mysql.createPool(iwill);

export { pool };
