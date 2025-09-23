import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@/stores/store';
import AppNavigator from '@/navigator/AppNavigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '856981985123-vbp2cfhj6csg11qje2kcjh1miufn16g3.apps.googleusercontent.com',
  offlineAccess: true,
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
