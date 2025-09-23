import { User } from '@/types/auth';
import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  setDoc,
  doc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

const firestore = getFirestore(getApp());

export const createUserProfile = async (uid: string, data: Partial<User>) => {
  try {
    await setDoc(doc(firestore, 'users', uid), {
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};
