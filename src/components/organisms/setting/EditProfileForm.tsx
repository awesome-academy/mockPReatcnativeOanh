import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { AppInput } from '@/components/atoms/AppInput';
import UserIcon from '@/assets/svgs/user.svg';
import { BASE_COLORS } from '@/styles/color';
import { commonStyles } from '@/styles/common';
import { Profile } from '@/types/auth';

type Props = {
  formData: Profile;
  fieldErrors: Partial<Record<keyof Profile, string>>;
  error?: string | null;
  success?: boolean;
  onChange: (field: keyof Profile, value: string) => void;
};

export function EditProfileForm({
  formData,
  fieldErrors,
  error,
  success,
  onChange,
}: Props) {
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.avatar}>
        <UserIcon width={60} height={60} />
      </View>
      <View>
        {error && (
          <Text style={[styles.description, commonStyles.fail]}>{error}</Text>
        )}
        <Text style={[styles.description, success && commonStyles.success]}>
          Thông tin sẽ được lưu cho lần mua kế tiếp
        </Text>
        <Text style={styles.description}>
          Bấm vào thông tin chi tiết để chỉnh sửa
        </Text>
      </View>
      <View>
        <AppInput
          placeholder="Họ và tên"
          value={formData.userName}
          onChangeText={text => onChange('userName', text)}
          error={fieldErrors.userName}
          style={styles.input}
        />
        <AppInput
          placeholder="E-mail"
          value={formData.email}
          onChangeText={text => onChange('email', text)}
          keyboardType="email-address"
          error={fieldErrors.email}
          style={styles.input}
        />
        <AppInput
          placeholder="Địa chỉ"
          value={formData.address}
          onChangeText={text => onChange('address', text)}
          error={fieldErrors.address}
          style={styles.input}
        />
        <AppInput
          placeholder="Số điện thoại"
          value={formData.phoneNumber}
          onChangeText={text => onChange('phoneNumber', text)}
          keyboardType="phone-pad"
          error={fieldErrors.phoneNumber}
          style={styles.input}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 90,
    height: 90,
    borderColor: BASE_COLORS.gray_60,
    borderWidth: 1,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 48,
    gap: 24,
    backgroundColor: BASE_COLORS.white,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    borderWidth: 0,
    borderBottomColor: BASE_COLORS.gray_60,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 4,
  },
});
