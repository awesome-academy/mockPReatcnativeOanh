import { User } from '@/types/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';

const auth = getAuth(getApp());

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return auth.signOut();
};

export const signUp = (data: User) => {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
};
