import { Request, Response } from 'express';
// import { firebaseAdmin } from '../config/firebase';
import { responses, defaultError } from '../utils/response';
import SubRepo from '../repositories/sub.repository';
import { subscribeTopic, unsubscribeTopic } from '../utils/subscribe';

export const createSub = async (req: Request, res: Response) => {
  try {
    const subObj: object = req.body;
    const subRepo = new SubRepo();
    await subRepo.createTopic(subObj);

    responses(res, subObj);
  } catch (e) {
    defaultError(res, e);
  }
};

export const getTopics = async (req: Request, res: Response) => {
  try {
    const subRepo = new SubRepo();
    const topicObj: any = await subRepo.getTopics();

    responses(res, topicObj);
  } catch (e) {
    defaultError(res, e);
  }
};

export const subscribeTopics = async (req: Request, res: Response) => {
  try {
    const fcmToken: string = req.body.token;
    const tokens = [];
    tokens.push(fcmToken);
    const subRepo = new SubRepo();
    const topicInfos = await subRepo.getTopicInfo(fcmToken);
    const topicNames = [];
    for (const topicInfo of topicInfos) {
      topicNames.push(topicInfo.darakbang_group, topicInfo.community_name);
    }
    // accounts_fcm_token 테이블에 추가(구독 히스토리)
    await subRepo.createAccountSub(fcmToken);

    //구독
    for (const subTopics of topicNames) {
      await subscribeTopic(tokens, subTopics);
    }
    responses(res);
  } catch (e) {
    defaultError(res, e);
  }
};

export const unsubscribeTopics = async (req: Request, res: Response) => {
  try {
    const fcmToken: string = req.body.token;
    const tokens = [];
    tokens.push(fcmToken);
    const subRepo = new SubRepo();
    const topicInfos = await subRepo.getTopicInfo(fcmToken);
    const topicNames = [];
    for (const topicInfo of topicInfos) {
      topicNames.push(topicInfo.darakbang_group, topicInfo.community_name);
    }
    // accounts_fcm_token 테이블에 추가(구독 히스토리)
    await subRepo.deleteAccountSub(fcmToken);

    //구독
    for (const subTopics of topicNames) {
      await unsubscribeTopic(tokens, subTopics);
    }
    responses(res);
  } catch (e) {
    defaultError(res, e);
  }
};
