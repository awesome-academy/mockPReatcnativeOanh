import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { BASE_COLORS } from '@/styles/color';
import {
  DELIVERY_FEE,
  SCREEN_LIST_TITLE,
  TRANSPORT_METHOD_CODE,
  TRANSPORT_METHOD_DESCRIPTION,
  TRANSPORT_METHOD_TITLE,
} from '@/constants/product';
import { commonStyles } from '@/styles/common';
import { CardPaymentForm } from '@/components/organisms/product/CardPaymentForm';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { OrderSummaryFooter } from '@/components/organisms/product/OrderSummaryFooter';
import { CardForm } from '@/types/product';
import { validateCardData } from '@/utils/cardErrorHandler';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import { formatDataOrder } from '@/utils/formatDataOrder';
import { createOrder } from '@/services/order';
import { removeSelectedItems } from '@/stores/shoppingCart';
import Toast from 'react-native-toast-message';
import { SCREEN_LIST } from '@/constants/screen';

export default function PaymentInformation() {
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const confirm = useConfirmDialog();
  const { items, checkoutForm } = useSelector(
    (state: RootState) => state.shoppingCart,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [cardData, setCardData] = useState<CardForm>({
    card_number: '',
    card_holder: '',
    expiry_date: '',
    cvv: '',
  });
  const [fieldErrors, setFieldErrors] = useState<{
    card_number?: string;
    card_holder?: string;
    expiry_date?: string;
    cvv?: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const isFormValid = Object.values(cardData).every(value =>
    typeof value === 'string'
      ? value.trim() !== ''
      : value !== undefined && value !== null,
  );

  const handleOrder = async () => {
    const result = validateCardData(cardData);
    if (!result.valid) {
      setFieldErrors(result.errors);
      return;
    }
    const ok = await confirm({
      title: 'Xác nhận đặt hàng?',
      message: '',
    });

    if (ok) {
      try {
        setLoading(true);
        const orderData = formatDataOrder(
          { ...checkoutForm, ...cardData },
          items,
          user,
          checkoutForm.total ?? 0,
        );
        const { id } = await createOrder(orderData);
        if (id) {
          dispatch(removeSelectedItems());
          handleAfterSubmit('success');
          navigation.navigate(SCREEN_LIST.ORDER_SUCCESSFUL);
        } else {
          throw new Error('Order creation failed');
        }
      } catch (error) {
        handleAfterSubmit('error');
      }
      setLoading(false);
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

  if (loading) {
    return <ActivityIndicator size="large" style={commonStyles.center} />;
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.CHECKOUT}
        onBackPress={() => navigation.goBack()}
        showShoppingCart={false}
      />

      <ScrollView style={styles.body}>
        <CardPaymentForm
          formData={cardData}
          fieldErrors={fieldErrors}
          onChange={(field: keyof CardForm, value: string | number) => {
            setCardData(prev => ({ ...prev, [field]: value }));
            setFieldErrors(prev => ({ ...prev, [field]: undefined }));
          }}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          <Text style={styles.textDetail}>{checkoutForm?.userName ?? ''}</Text>
          <Text style={styles.textDetail}>{checkoutForm?.email ?? ''}</Text>
          <Text style={styles.textDetail}>{checkoutForm?.address ?? ''}</Text>
          <Text style={styles.textDetail}>
            {checkoutForm?.phoneNumber ?? ''}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>
          <Text style={styles.transport}>
            {
              TRANSPORT_METHOD_TITLE[
                checkoutForm.transport_method || TRANSPORT_METHOD_CODE.FAST
              ]
            }
          </Text>
          <Text style={styles.transportDesc}>
            {
              TRANSPORT_METHOD_DESCRIPTION[
                checkoutForm.transport_method || TRANSPORT_METHOD_CODE.FAST
              ]
            }
          </Text>
        </View>
      </ScrollView>

      <OrderSummaryFooter
        price={checkoutForm.price ?? 0}
        fee={
          DELIVERY_FEE[
            checkoutForm.transport_method ?? TRANSPORT_METHOD_CODE.FAST
          ]
        }
        total={checkoutForm.total ?? 0}
        buttonText="ĐẶT HÀNG"
        disabled={!isFormValid}
        onPress={handleOrder}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: BASE_COLORS.white,
  },
  section: {
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: BASE_COLORS.gray_20,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderColor: BASE_COLORS.gray_100,
    marginBottom: 12,
  },
  transport: {
    fontSize: 14,
    fontWeight: '500',
  },
  transportDesc: {
    fontSize: 12,
    color: BASE_COLORS.gray_60,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: BASE_COLORS.gray_20,
    padding: 16,
    gap: 16,
  },
  textDetail: {
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_60,
    marginBottom: 8,
  },
});
