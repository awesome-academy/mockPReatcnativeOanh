import { Profile, User } from '@/types/auth';
import { getApp } from '@react-native-firebase/app';
import {
  getFirestore,
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
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

export const getCurrentUserProfile = async (uid: string) => {
  try {
    const userRef = doc(firestore, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: 'User profile not found' };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = (uid: string, data: Partial<Profile>) => {
  return setDoc(doc(firestore, 'users', uid), data, { merge: true });
};
