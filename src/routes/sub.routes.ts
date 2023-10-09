import { Router } from 'express';
import {
  createSub,
  getTopics,
  subscribeTopics,
  unsubscribeTopics,
} from '../controllers/sub.controller';

const router = Router();

router.route('/createSub').post(createSub);

router.route('/topics').get(getTopics);

router.route('/subscribe').post(subscribeTopics);

router.route('/unsubscribe').post(unsubscribeTopics);

export default router;
