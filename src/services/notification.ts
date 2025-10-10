import { store } from '@/stores/store';
import { Notification } from '@/types/setting';
import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
  getDoc,
  where,
} from '@react-native-firebase/firestore';

const firestore = getFirestore(getApp());

export const getListNotification = async (
  pageSize: number,
  lastVisibleId?: string,
): Promise<{ notifications: Notification[]; lastVisibleId: string | null }> => {
  try {
    const { user } = store.getState().auth;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const notificationsCollection = collection(firestore, 'notifications');

    let lastDoc: any = null;
    if (lastVisibleId) {
      const docRef = doc(firestore, 'notifications', lastVisibleId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) lastDoc = docSnap;
    }

    let notificationsQuery = query(
      notificationsCollection,
      where('uid', '==', user.uid),
      orderBy('created_at', 'desc'),
      limit(pageSize),
    );

    if (lastDoc)
      notificationsQuery = query(notificationsQuery, startAfter(lastDoc));

    const snapshot = await getDocs(notificationsQuery);

    const notifications: Notification[] = snapshot.docs.map(
      (docSnap: { data: () => any; id: any }) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          created_at:
            data.created_at?.toDate?.().toLocaleDateString('vi-VN') ?? '',
        };
      },
    );

    const newLastVisibleId =
      snapshot.docs.length > 0
        ? snapshot.docs[snapshot.docs.length - 1].id
        : null;

    return { notifications, lastVisibleId: newLastVisibleId };
  } catch (error) {
    throw error;
  }
};
