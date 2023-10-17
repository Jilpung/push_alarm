import cron from 'node-cron';
import { sendNotification } from '../controllers/notification.controller';

console.log('Cron job is running every minute.');

cron.schedule('* * * * *', async () => {
  try {
    console.log('Cron job is running every minute.', new Date());

    await notificationSunAd();
  } catch (e) {
    console.error('Failed to send notification: ', e);
  }
});

export const notificationSunAd = async () => {
  try {
    const notificationSunAds = await sendNotification();

    return notificationSunAds;
  } catch (e) {
    console.log(e);
  }
};
