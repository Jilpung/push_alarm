import { Router } from 'express';
import {
  getAccounts,
  sendNotification,
} from '../controllers/notificationController';

const router = Router();

router.route('/sendNotification').post(sendNotification);

router.route('/accounts').get(getAccounts);

export default router;
