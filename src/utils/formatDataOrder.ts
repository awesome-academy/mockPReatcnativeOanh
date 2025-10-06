import { PAYMENT_METHOD_CODE, TRANSPORT_METHOD_CODE } from '@/constants/product';
import { Profile } from '@/types/auth';
import { CheckoutFormType, Product } from '@/types/product';

export const formatDataOrder = (
  formData: CheckoutFormType,
  items: Product[],
  user: Profile,
  total: number
) => {
  return {
    user: {
      uid: user?.uid || '',
      userName: formData.userName || '',
      email: formData.email || '',
      phoneNumber: formData.phoneNumber || '',
      address: formData.address || '',
    },
    products: items
      .filter(i => i.selected)
      .map(i => ({
        id: i.id,
        name: i.name,
        image: i.image,
        product_type: i.product_type,
        price: i.price,
        quantity: i.quantity,
      })),
    payment_amount: total,
    transport_method:
      formData.transport_method ?? TRANSPORT_METHOD_CODE.FAST,
    payment_method:
      formData.payment_method ?? PAYMENT_METHOD_CODE.VISA_MASTERCARD,
    card_number: formData.card_number ?? null,
    card_holder: formData.card_holder ?? null,
    expiry_date: formData.expiry_date ?? null,
    cvv: formData.cvv ?? null,
  };
};
