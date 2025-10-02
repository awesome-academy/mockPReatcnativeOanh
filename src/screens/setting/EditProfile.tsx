import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { SCREEN_LIST_TITLE } from '@/constants/product';
import { RootState } from '@/stores/store';
import { commonStyles } from '@/styles/common';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { validateEditProfile } from '@/utils/authErrorHandler';
import { updateUserProfile } from '@/services/user';
import { login } from '@/stores/auth';
import { Profile } from '@/types/auth';
import { EditProfileForm } from '@/components/organisms/setting/EditProfileForm';
import { EditProfileFooter } from '@/components/organisms/setting/EditProfileFooter';

export default function EditProfile() {
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<Profile>({
    userName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof Profile, string>>
  >({});

  const isFormValid = Object.values(formData).every(
    value => value.trim() !== '',
  );

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleEditProfile = async () => {
    setLoading(true);
    setSuccess(false);
    const result = await validateEditProfile(formData);

    if (!result.valid) {
      setFieldErrors(result.errors);
      setLoading(false);
      return;
    }

    try {
      await updateUserProfile(user.uid ?? '', formData);
      setSuccess(true);
      dispatch(login({ user: { ...user, ...formData } }));
    } catch (err: any) {
      setFormData(user);
      setError(err?.message ?? 'Đã có lỗi xảy ra.');
      setSuccess(false);
    }
    setLoading(false);
  };

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.EDIT_PROFILE}
        onBackPress={() => navigation.navigate('Profile')}
        showShoppingCart={false}
      />
      <EditProfileForm
        formData={formData}
        fieldErrors={fieldErrors}
        error={error}
        success={success}
        onChange={(field: keyof Profile, value: string) => {
          setSuccess(false);
          setFormData(prev => ({ ...prev, [field]: value }));
          setFieldErrors(prev => ({ ...prev, [field]: undefined }));
        }}
      />
      <EditProfileFooter isFormValid={isFormValid} onSave={handleEditProfile} />
    </SafeAreaView>
  );
}
