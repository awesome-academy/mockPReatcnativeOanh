import { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { saveFcmToken } from './useFirebaseNotifications';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  await notifee.displayNotification({
    title: remoteMessage.notification?.title ?? 'Thông báo',
    body: remoteMessage.notification?.body ?? 'Bạn có thông báo mới',
    android: {
      channelId: 'order-notification',
      pressAction: { id: 'order-notification' },
    },
  });
});

async function requestUserPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (!granted) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  } else {
    const authStatus = await messaging().hasPermission();
    if (authStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
      await messaging().requestPermission();
    }
  }
}

export function useFirebaseNotifications() {
  useEffect(() => {
    let foregroundUnsubscribe: (() => void) | undefined;
    let unsubscribeNotifee: (() => void) | undefined;

    async function init() {
      try {
        await requestUserPermission();

        const channelId = await notifee.createChannel({
          id: 'order-notification',
          name: 'Order Notifications',
          importance: AndroidImportance.HIGH,
        });

        const token = await messaging().getToken();
        if (token) {
          await saveFcmToken(token);
          await messaging().subscribeToTopic('order-notification');
        }

        // Foreground messages
        foregroundUnsubscribe = messaging().onMessage(async remoteMessage => {
          await notifee.displayNotification({
            title: remoteMessage.notification?.title ?? 'Thông báo',
            body: remoteMessage.notification?.body ?? 'Bạn có thông báo mới',
            android: {
              channelId,
              pressAction: { id: 'order-notification' },
            },
          });
        });

        // Notification press
        unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
          if (type === EventType.PRESS) {
            console.log('User pressed notification:', detail.notification);
          }
        });
      } catch (e) {
        console.warn('Firebase notification setup failed:', e);
      }
    }

    init();

    return () => {
      if (foregroundUnsubscribe) foregroundUnsubscribe();
      if (unsubscribeNotifee) unsubscribeNotifee();
    };
  }, []);
}
