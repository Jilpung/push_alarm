import { Router } from 'express';
import {
  getAccounts,
  sendNotificationToken,
  sendNotificationTopics,
} from '../controllers/notification.controller';

const router = Router();

router.route('/sendNotificationToken').post(sendNotificationToken);

router.route('/sendNotificationTopics').post(sendNotificationTopics);

router.route('/accounts').get(getAccounts);

export default router;
