import { Request, Response } from 'express';
import { firebaseAdmin } from '../config/firebase';
import { responses, defaultError } from '../utils/response';
import NotificationRepo from '../repositories/notification.repository';

export const sendNotificationToken = async (req: Request, res: Response) => {
  try {
    const registrationToken: string = req.body.token;

    const message = {
      notification: {
        title: req.body.notification.title,
        body: req.body.notification.body,
      },
      token: registrationToken,
      android: {
        priority: 'high' as const,
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
          },
        },
      },
    };

    await firebaseAdmin
      .messaging()
      .send(message)
      .then(function (response) {
        console.log('Successfully sent message: ', response);
      });

    responses(res, message);
  } catch (e) {
    defaultError(res, e);
  }
};

export const sendNotificationTopics = async (req: Request, res: Response) => {
  try {
    const topic: string = req.body.topic;

    const message = {
      notification: {
        title: req.body.notification.title,
        body: req.body.notification.body,
      },
      topic: topic,
      android: {
        priority: 'high' as const,
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
          },
        },
      },
    };

    await firebaseAdmin
      .messaging()
      .send(message)
      .then(function (response) {
        console.log('Successfully sent message: ', response);
      });

    responses(res, message);
  } catch (e) {
    defaultError(res, e);
  }
};

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const notificationRepo = new NotificationRepo();
    const notificateObj: any = await notificationRepo.getNotification();

    responses(res, notificateObj);
  } catch (e) {
    defaultError(res, e);
  }
};
