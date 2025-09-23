import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { RootState } from '@/stores/store';
import LoginScreen from '@/screens/auth/Login';
import RegisterScreen from '@/screens/auth/Register';
import { HomeScreen } from '@/screens/home/HomeScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Setting: undefined;
};

const Auth = createNativeStackNavigator<AuthStackParamList>();
const App = createNativeStackNavigator<AppStackParamList>();

const AuthStack = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

const AppStack = () => {
  return (
    <App.Navigator>
      <App.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <App.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      /> */}
    </App.Navigator>
  );
};

export default function AppNavigation() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
