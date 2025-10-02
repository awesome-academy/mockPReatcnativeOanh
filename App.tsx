import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@/stores/store';
import AppNavigator from '@/navigator/AppNavigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@env';
import Toast from 'react-native-toast-message';
import { ConfirmProvider } from '@/hooks/useConfirmDialog';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ConfirmProvider>
          <AppNavigator />
          <Toast />
        </ConfirmProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
