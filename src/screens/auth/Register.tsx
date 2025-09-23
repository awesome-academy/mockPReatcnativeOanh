import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signUp } from '@/services/auth';
import {
  getAuthErrorMessage,
  validateAuthData,
} from '@/utils/authErrorHandler';
import { AuthStackParamList } from '@/navigator/AppNavigation';
import { AppInput } from '@/components/atoms/AppInput';
import { commonStyles } from '@/styles/common';
import { BASE_COLORS } from '@/styles/color';
import { createUserProfile } from '@/services/user';
import AppButton from '@/components/atoms/AppButton';
import GoogleIcon from '@/assets/svgs/google.svg';
import EyeFilledIcon from '@/assets/svgs/eye-filled.svg';
import EyeInvisibleFilledIcon from '@/assets/svgs/eye-invisible-filled.svg';

type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    userName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    global?: string;
  }>({});

  const handleRegister = async () => {
    setLoading(true);
    const data = {
      userName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    };

    const result = await validateAuthData(data, 'register');
    if (!result.valid) {
      setFieldErrors(result.errors);
      setLoading(false);
      return;
    }

    try {
      const res = await signUp(data);
      await createUserProfile(res.user.uid, data);
      Alert.alert(
        'Đăng ký thành công',
        'Bạn có thể đăng nhập bằng thông tin tài khoản của mình.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
      );
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
        <Text style={styles.headerText}>Đăng ký</Text>
        <Text style={styles.descriptionText}>Tạo tài khoản</Text>
        <View style={styles.loginForm}>
          <AppInput
            placeholder="Họ tên"
            value={userName}
            onChangeText={text => {
              setUserName(text);
              setFieldErrors(prev => ({ ...prev, userName: undefined }));
            }}
            keyboardType="default"
            autoCapitalize="words"
            error={fieldErrors.userName}
          />
          <AppInput
            placeholder="E-mail"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setFieldErrors(prev => ({ ...prev, email: undefined }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={fieldErrors.email}
          />
          <AppInput
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
              setFieldErrors(prev => ({ ...prev, phoneNumber: undefined }));
            }}
            keyboardType="phone-pad"
            autoCapitalize="none"
            error={fieldErrors.phoneNumber}
          />
          <AppInput
            placeholder="Nhập mật khẩu"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setFieldErrors(prev => ({ ...prev, password: undefined }));
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
          <AppInput
            placeholder="Nhập xác nhận mật khẩu"
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setFieldErrors(prev => ({
                ...prev,
                confirmPassword: undefined,
              }));
            }}
            secureTextEntry={!showConfirmPassword}
            rightIcon={
              showConfirmPassword ? (
                <EyeFilledIcon width={29} height={24} />
              ) : (
                <EyeInvisibleFilledIcon width={29} height={24} />
              )
            }
            onRightIconPress={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            error={fieldErrors.confirmPassword}
          />

          <Text style={styles.allowCondition}>
            <Text>Để đăng ký tài khoản, bạn đồng ý </Text>
            <Text style={commonStyles.textCondition}>Terms & Conditions</Text>
            <Text> và </Text>
            <Text style={commonStyles.textCondition}>Privacy Policy</Text>
          </Text>

          <AppButton
            title="Đăng ký"
            onPress={() => handleRegister()}
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
            <Text>Tôi đã có tài khoản</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={commonStyles.corlor_primary}>Đăng nhập</Text>
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
    marginTop: -120,
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
  allowCondition: {
    textAlign: 'center',
    alignItems: 'center',
  },
});
