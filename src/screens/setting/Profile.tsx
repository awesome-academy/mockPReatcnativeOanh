import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function UserProfile() {
  return (
    <SafeAreaProvider>
      <Text>User Profile</Text>
    </SafeAreaProvider>
  );
}
