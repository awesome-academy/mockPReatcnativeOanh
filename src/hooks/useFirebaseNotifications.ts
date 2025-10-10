import { store } from '@/stores/store';
import firestore, { doc, setDoc } from '@react-native-firebase/firestore';

export async function saveFcmToken(token: string) {
  const { user } = store.getState().auth;
  if (user?.uid && token) {
    await setDoc(
      doc(firestore, 'users', user.uid),
      { fcmToken: token },
      { merge: true },
    );
  }
}
