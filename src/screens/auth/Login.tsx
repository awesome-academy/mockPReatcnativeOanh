import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { login } from '@/stores/auth';
import { signIn } from '@/services/auth';
import {
  getAuthErrorMessage,
  validateAuthData,
} from '@/utils/authErrorHandler';
import { AuthStackParamList } from '@/navigator/AppNavigation';
import { AppInput } from '@/components/atoms/AppInput';
import { commonStyles } from '@/styles/common';
import CheckCircleIcon from '@/assets/svgs/check-circle.svg';
import AppButton from '@/components/atoms/AppButton';
import GoogleIcon from '@/assets/svgs/google.svg';
import EyeFilledIcon from '@/assets/svgs/eye-filled.svg';
import EyeInvisibleFilledIcon from '@/assets/svgs/eye-invisible-filled.svg';
import { BASE_COLORS } from '@/styles/color';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    global?: string;
  }>({});

  const handleLogin = async () => {
    setLoading(true);
    const data = { email, password };

    const result = await validateAuthData(data, 'login');
    if (!result.valid) {
      setFieldErrors(result.errors);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signIn(email, password);
      dispatch(login({ email: userCredential.user.email ?? '' }));
    } catch (err: any) {
      const msg = getAuthErrorMessage(err.code);
      setFieldErrors(msg);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={require('@/assets/images/login_image.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Chào mừng bạn</Text>
        <Text style={styles.descriptionText}>Đăng nhập tài khoản</Text>
        <View style={styles.loginForm}>
          <AppInput
            placeholder="Nhập email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setFieldErrors(prev => ({
                ...prev,
                email: undefined,
                global: undefined,
              }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={fieldErrors.email}
          />
          <AppInput
            placeholder="Nhập mật khẩu"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setFieldErrors(prev => ({
                ...prev,
                password: undefined,
                global: undefined,
              }));
            }}
            secureTextEntry={!showPassword}
            rightIcon={
              showPassword ? (
                <EyeFilledIcon width={29} height={24} />
              ) : (
                <EyeInvisibleFilledIcon width={29} height={24} />
              )
            }
            onRightIconPress={() => setShowPassword(!showPassword)}
            error={fieldErrors.password}
          />

          <View style={commonStyles.flex_row}>
            <View style={styles.saveLogin}>
              <CheckCircleIcon width={22} height={22} />
              <Text>Nhớ tài khoản</Text>
            </View>
            <TouchableOpacity>
              <Text
                style={[commonStyles.corlor_primary, commonStyles.font_medium]}
              >
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>

          <AppButton
            title="Đăng nhập"
            onPress={() => handleLogin()}
            gradient
            containerStyle={commonStyles.mt_24}
            loading={loading}
          />
          {fieldErrors.global && (
            <Text style={commonStyles.errorText}>{fieldErrors.global}</Text>
          )}

          <View style={commonStyles.dividerContainer}>
            <View style={commonStyles.dividerLine} />
            <Text style={commonStyles.dividerText}>Hoặc</Text>
            <View style={commonStyles.dividerLine} />
          </View>

          <TouchableOpacity
            style={commonStyles.loginWithGoogle}
            onPress={() => {}}
          >
            <GoogleIcon width={32} height={32} />
          </TouchableOpacity>

          <View style={commonStyles.footerText}>
            <Text>Bạn không có tài khoản</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={commonStyles.corlor_primary}>Tạo tài khoản</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: BASE_COLORS.text,
  },
  image: {
    width: '100%',
    height: 360,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
  },
  loginForm: {
    marginTop: 24,
    paddingHorizontal: 36,
    flex: 1,
  },
  saveLogin: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
});
