import { User } from '@/types/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createUserProfile } from './user';

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

export const loginWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();

    let idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error('No ID token found');
    }

    const googleCredential = GoogleAuthProvider.credential(idToken);

    const userCredential = await signInWithCredential(auth, googleCredential);

    const { user, additionalUserInfo } = userCredential;

    if (additionalUserInfo?.isNewUser) {
      await createUserProfile(user.uid, {
        email: user.email ?? '',
        userName: user.displayName ?? '',
        phoneNumber: user.phoneNumber ?? '',
      });
    }

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
