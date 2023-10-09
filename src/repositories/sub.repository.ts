// import getAccounts from '../repositories/notification.repository';
import { pool } from '../config/db';
import NotificationRepo from '../repositories/notification.repository';

//토픽 추가(중간 테이블도 추가), 토픽 삭제(중간 테이블도 삭제), 구독, 언구독 > 계정
class SubRepo {
  async createTopic(subObj: any) {
    let connection = null;
    try {
      connection = await pool.getConnection();
      const topicName = subObj.topic_name;
      const createdAt = new Date();

      const [results] = await connection.query(
        'INSERT INTO fcm_topic (topic_name, created_at) VALUES (?, ?)',
        [topicName, createdAt],
      );

      const createSub: any = results;

      return createSub;
    } catch (err) {
      console.error('쿼리 실행 에러:', err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async createAccountSub(fcmToken: string) {
    let connection = null;
    try {
      connection = await pool.getConnection();
      const notificationRepo = new NotificationRepo();
      const accounts: any = await notificationRepo.getNotification();
      const subRepo = new SubRepo();
      const topics: any = await subRepo.getTopics();
      const accountsIds = [];
      const fcmTopicIds = [];
      for (const account of accounts) {
        if (account.fcm_token === fcmToken) {
          accountsIds.push(account.account_id);
          for (const topic of topics) {
            if (
              topic.topic_name === account.community_name ||
              topic.topic_name === account.darakbang_group
            ) {
              fcmTopicIds.push(topic.fcm_topic_id);
            }
          }
        }
      }

      const createdAt = new Date();

      for (const accountId of accountsIds) {
        for (const fcmTopicId of fcmTopicIds) {
          await connection.query(
            'INSERT INTO accounts_fcm_topic (account_id, fcm_topic_id, created_at) VALUES (?, ?, ?)',
            [accountId, fcmTopicId, createdAt],
          );
        }
      }
    } catch (err) {
      console.error('쿼리 실행 에러:', err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async deleteAccountSub(fcmToken: string) {
    let connection = null;
    try {
      connection = await pool.getConnection();
      const notificationRepo = new NotificationRepo();
      const accounts: any = await notificationRepo.getNotification();
      const subRepo = new SubRepo();
      const topics: any = await subRepo.getTopics();
      const accountsIds = [];
      const fcmTopicIds = [];
      for (const account of accounts) {
        if (account.fcm_token === fcmToken) {
          accountsIds.push(account.account_id);
          for (const topic of topics) {
            if (
              topic.topic_name === account.community_name ||
              topic.topic_name === account.darakbang_group
            ) {
              fcmTopicIds.push(topic.fcm_topic_id);
            }
          }
        }
      }

      for (const accountId of accountsIds) {
        await connection.query(
          'DELETE FROM accounts_fcm_topic WHERE account_id = "?"',
          [accountId],
        );
      }
    } catch (err) {
      console.error('쿼리 실행 에러:', err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getTopics() {
    let connection = null;

    try {
      connection = await pool.getConnection();

      const [results] = await connection.execute(`
        SELECT
          *
        FROM fcm_topic
      `);

      const topics: any = results;

      return topics;
    } catch (err) {
      console.error('쿼리 실행 에러:', err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getTopicInfo(fcmToken: string) {
    let connection = null;

    try {
      connection = await pool.getConnection();

      const [results] = await connection.execute(
        `
        SELECT
          a.username,
          a.fcm_token,
          cg.darakbang_group,
          c.community_name 
        FROM accounts a 
        LEFT JOIN church_groups cg ON cg.church_group_id = a.church_group_id 
        LEFT JOIN communities c ON c.community_id = cg.community_id
        WHERE 
          a.fcm_token = ?
        `,
        [fcmToken],
      );

      const topics: any = results;

      return topics;
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

export default SubRepo;
