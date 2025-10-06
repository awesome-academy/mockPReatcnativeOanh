import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { RootState } from '@/stores/store';
import { BASE_COLORS } from '@/styles/color';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import {
  DELIVERY_FEE,
  PAYMENT_METHOD_CODE,
  SCREEN_LIST_TITLE,
  TRANSPORT_METHOD_CODE,
} from '@/constants/product';
import { commonStyles } from '@/styles/common';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import { CheckoutForm } from '@/components/organisms/product/CheckoutForm';
import { CheckoutFormType } from '@/types/product';
import { validateEditProfile } from '@/utils/authErrorHandler';
import { formatDataOrder } from '@/utils/formatDataOrder';
import { createOrder } from '@/services/order';
import { removeSelectedItems, setCheckoutForm } from '@/stores/shoppingCart';
import { OrderSummaryFooter } from '@/components/organisms/product/OrderSummaryFooter';

export default function ShoppingCartScreen() {
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const confirm = useConfirmDialog();

  const { items, checkoutForm } = useSelector(
    (state: RootState) => state.shoppingCart,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<CheckoutFormType>({
    userName: '',
    email: '',
    phoneNumber: '',
    address: '',
    transport_method: TRANSPORT_METHOD_CODE.FAST,
    payment_method: PAYMENT_METHOD_CODE.VISA_MASTERCARD,
  });

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof CheckoutFormType, string>>
  >({});

  const isFormValid = Object.values(formData).every(value =>
    typeof value === 'string'
      ? value.trim() !== ''
      : value !== undefined && value !== null,
  );

  useEffect(() => {
    if (user)
      setFormData({
        ...formData,
        ...user,
        ...checkoutForm,
        price: items
          .filter(i => i.selected)
          .reduce((sum, i) => sum + i.price * i.quantity, 0),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const updatedTotal =
      (formData.price ?? 0) +
      DELIVERY_FEE[formData.transport_method ?? TRANSPORT_METHOD_CODE.FAST];
    setTotal(updatedTotal);
    setFormData(prev => ({ ...prev, total: updatedTotal }));
  }, [formData.transport_method, formData.price]);

  const handleButtonCheckout = async () => {
    const result = await validateEditProfile({
      userName: formData.userName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    });

    if (!result.valid) {
      setFieldErrors(result.errors);
      return;
    }

    if (formData.transport_method === TRANSPORT_METHOD_CODE.COD) {
      const ok = await confirm({
        title: 'Xác nhận đặt hàng?',
        message: '',
      });

      if (ok) {
        try {
          setLoading(true);
          const orderData = formatDataOrder(formData, items, user, total);
          const { id } = await createOrder(orderData);
          if (id) {
            dispatch(removeSelectedItems());
            handleAfterSubmit('success');
          } else {
            throw new Error('Order creation failed');
          }
        } catch (error) {
          handleAfterSubmit('error');
        }
        setLoading(false);
      }
    } else {
      dispatch(setCheckoutForm(formData));
      navigation.navigate('PaymentInformation');
    }
  };

  const handleAfterSubmit = (type: 'success' | 'error') => {
    Toast.show({
      type,
      text1:
        type === 'success'
          ? 'Đặt hàng thành công!'
          : 'Có lỗi xảy ra. Đặt hàng thất bại. Vui lòng thử lại.',
      visibilityTime: 2000,
      autoHide: true,
    });
    navigation.navigate('ShoppingCart');
  };

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.CHECKOUT}
        onBackPress={() => navigation.goBack()}
        showShoppingCart={false}
      />
      <View style={styles.body}>
        <CheckoutForm
          formData={formData}
          fieldErrors={fieldErrors}
          onChange={(field: keyof CheckoutFormType, value: string | number) => {
            setFormData(prev => ({ ...prev, [field]: value }));
            setFieldErrors(prev => ({ ...prev, [field]: undefined }));
          }}
        />
        <OrderSummaryFooter
          price={formData.price ?? 0}
          fee={
            DELIVERY_FEE[
              formData.transport_method ?? TRANSPORT_METHOD_CODE.FAST
            ]
          }
          total={formData.total ?? 0}
          buttonText={
            formData.transport_method === TRANSPORT_METHOD_CODE.COD
              ? 'ĐẶT HÀNG'
              : 'TIẾP TỤC'
          }
          disabled={!isFormValid}
          onPress={handleButtonCheckout}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: BASE_COLORS.white,
  },
});
