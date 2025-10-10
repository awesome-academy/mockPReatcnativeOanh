import { ORDER_STATUS } from '@/constants/product';
import { Order } from '@/types/setting';
import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
  getDoc,
  where,
} from '@react-native-firebase/firestore';
import notifee from '@notifee/react-native';
import auth from '@react-native-firebase/auth';
import { store } from '@/stores/store';

const firestore = getFirestore(getApp());

export const createOrder = async (order: Omit<Order, 'id'>) => {
  try {
    const colRef = collection(firestore, 'orders');
    const docRef = doc(colRef);
    const id = docRef.id;

    await setDoc(docRef, {
      ...order,
      id,
      status: ORDER_STATUS.SUCCESS,
      order_date: serverTimestamp(),
    });

    const user = auth().currentUser;
    if (user) {
      await firestore.collection('notifications').add({
        uid: user.uid,
        title: 'Đặt hàng thành công',
        order_id: id,
        read: false,
        created_at: serverTimestamp(),
        price: order.payment_amount,
        number_of_products: order.products.length ?? 0,
      });

      await notifee.displayNotification({
        title: 'Đặt hàng thành công!',
        body: 'Đơn hàng của bạn đã được ghi nhận.',
        android: {
          channelId: 'order-notification',
          smallIcon: 'ic_launcher',
        },
      });
    }

    return { id };
  } catch (error) {
    throw error;
  }
};

export const getListOrderHistory = async (
  pageSize: number,
  lastVisibleId?: string,
): Promise<{ orders: Order[]; lastVisibleId: string | null }> => {
  try {
    const { user } = store.getState().auth;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const ordersCollection = collection(firestore, 'orders');

    let lastDoc: any = null;
    if (lastVisibleId) {
      const docRef = doc(firestore, 'orders', lastVisibleId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) lastDoc = docSnap;
    }

    let ordersQuery = query(
      ordersCollection,
      where('user.uid', '==', user.uid),
      orderBy('order_date', 'desc'),
      limit(pageSize),
    );
    if (lastDoc) ordersQuery = query(ordersQuery, startAfter(lastDoc));

    const snapshot = await getDocs(ordersQuery);

    const orders: Order[] = snapshot.docs.map(
      (docSnap: { data: () => any; id: any }) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          order_date: data.order_date?.toDate?.().toLocaleDateString('vi-VN'),
        };
      },
    );

    const newLastVisibleId =
      snapshot.docs.length > 0
        ? snapshot.docs[snapshot.docs.length - 1].id
        : null;

    return { orders, lastVisibleId: newLastVisibleId };
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (id: string | number): Promise<Order> => {
  try {
    const orderDoc = await firestore.collection('orders').doc(String(id)).get();
    if (!orderDoc.exists) {
      throw new Error('Order not found');
    }
    const data = orderDoc.data();
    if (!data) {
      throw new Error('Order data not found');
    }
    return {
      id: orderDoc.id,
      ...data,
      order_date: data.order_date?.toDate().toLocaleDateString('vi-VN'),
    } as Order;
  } catch (error) {
    throw error;
  }
};
