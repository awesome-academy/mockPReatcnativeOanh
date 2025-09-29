import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { RootState } from '@/stores/store';
import { ProductType } from '@/constants/product';
import LoginScreen from '@/screens/auth/Login';
import RegisterScreen from '@/screens/auth/Register';
import HomeScreen from '@/screens/home/Home';
import ProfileScreen from '@/screens/setting/Profile';
import ListPlantPot from '@/screens/product/ListPlantPot';
import ListTool from '@/screens/product/ListTool';
import ListPlant from '@/screens/product/ListPlant';
import QuestionAndAnswer from '@/screens/setting/Question';
import TutorialList from '@/screens/setting/TutorialList';
import TutorialDetail from '@/screens/setting/TutorialDetail';
import ProductDetail from '@/screens/product/ProductDetail';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  ListPlantPot: undefined;
  ListTool: undefined;
  ListPlant: { status: number };
  ProductDetail: {
    id: number;
    type: ProductType;
  };
  QuestionAndAnswer: undefined;
  TutorialList: undefined;
  TutorialDetail: { id: number };
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
      <App.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="ListPlantPot"
        component={ListPlantPot}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="ListTool"
        component={ListTool}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="ListPlant"
        component={ListPlant}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="QuestionAndAnswer"
        component={QuestionAndAnswer}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="TutorialList"
        component={TutorialList}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="TutorialDetail"
        component={TutorialDetail}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
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
