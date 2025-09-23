import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function HomeScreen() {
  return (
    <SafeAreaProvider>
      <Text>Home Screen</Text>
    </SafeAreaProvider>
  );
}
