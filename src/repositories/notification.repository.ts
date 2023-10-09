import { pool } from '../config/db';

class NotificationRepo {
  async getNotification() {
    let connection = null;

    try {
      connection = await pool.getConnection();

      const [results] = await connection.execute(`
        SELECT
          a.*,
          c.darakbang_group,
          c2.community_id,
          c2.community_name
        FROM accounts a
        LEFT JOIN church_groups c ON c.church_group_id = a.church_group_id
        LEFT JOIN communities c2 ON c2.community_id = c.community_id
      `);

      const notifications: any = results;

      return notifications;
    } catch (err) {
      console.error('쿼리 실행 에러:', err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}

export default NotificationRepo;
