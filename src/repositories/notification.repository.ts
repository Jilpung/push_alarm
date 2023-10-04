// import { pool } from '../config/db';

// class NotificationRepo {
//   async getNotification() {
//     const db = await connectToDatabase();
//     try {
//       const [results] = await db.execute(`
//         SELECT
//           *
//         FROM accounts
//       `);
//       console.log([results]);

//       const notifications: any = results;

//       return notifications;
//     } catch (err) {
//       console.error('쿼리 실행 에러:', err);
//       throw err;
//     } finally {
//       db.end();
//     }
//   }
// }

// export default NotificationRepo;
import { pool } from '../config/db';

class NotificationRepo {
  async getNotification() {
    let connection = null; // connection 변수를 선언하고 null로 초기화합니다.

    try {
      // MySQL2 커넥션 풀에서 커넥션을 가져옵니다.
      connection = await pool.getConnection(); // 'connection' 변수에 커넥션 할당

      // 쿼리를 실행합니다.
      const [results] = await connection.execute(`
        SELECT
          *
        FROM accounts
      `);

      console.log(results);

      const notifications: any = results;

      return notifications;
    } catch (err) {
      console.error('쿼리 실행 에러:', err);
      throw err;
    } finally {
      // 커넥션을 릴리스합니다.
      if (connection) {
        connection.release();
      }
    }
  }
}

export default NotificationRepo;
