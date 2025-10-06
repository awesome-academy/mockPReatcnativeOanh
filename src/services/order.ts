import { ORDER_STATUS } from '@/constants/product';
import { Order } from '@/types/setting';
import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

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

    return { id };
  } catch (error) {
    throw error;
  }
};
