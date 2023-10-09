import { firebaseAdmin } from '../config/firebase';
import { defaultError } from '../utils/response';

const subscribeTopic = async (registrationTokens: any, topicName: any) => {
  try {
    const response = await firebaseAdmin
      .messaging()
      .subscribeToTopic(registrationTokens, topicName)
      .then(function (response) {
        console.log('Successfully subscribed to topic: ', response);
      });
    return response;
  } catch (e) {
    defaultError(e);
  }
};

const unsubscribeTopic = async (registrationTokens: any, topicName: any) => {
  try {
    const response = await firebaseAdmin
      .messaging()
      .unsubscribeFromTopic(registrationTokens, topicName)
      .then(function (response) {
        console.log('Successfully unsubscribed to topic: ', response);
      });
    return response;
  } catch (e) {
    defaultError(e);
  }
};

export { subscribeTopic, unsubscribeTopic };
