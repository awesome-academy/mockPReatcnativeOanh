import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function saveFcmToken(token: string) {
  const user = auth().currentUser;
  if (user && token) {
    await firestore().collection('users').doc(user.uid).set(
      { fcmToken: token },
      { merge: true }
    );
  }
}
