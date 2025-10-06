import { Plant, PlantPot, Tool } from '@/types/product';

export const PLANT_TYPE = {
  0: 'Ưa bóng',
  1: 'Ưa sáng',
};

export const SCREEN_LIST_TITLE = {
  PLANT_POT: 'Chậu cây trồng',
  TOOL: 'Phụ kiện chăm sóc',
  PLANT: 'Cây trồng',
  PROFILE: 'Profile',
  EDIT_PROFILE: 'Chỉnh sửa thông tin',
  TUTORIAL: 'Cẩm nang trồng cây',
  QUESTION: 'Q&A',
  HISTORY: 'Lịch sử giao dịch',
  TERM: 'Điều khoản và điều kiện',
  POLICY: 'Chính sách quyền riêng tư',
  SEARCH: 'Tìm kiếm',
  SHOPPING_CART: 'Giỏ hàng',
  CHECKOUT: 'Thanh toán',
  ORDER_SUCCESS: 'Đặt hàng thành công',
  NOTIFICATION: 'Thông báo',
};

export const PRODUCT_TYPE = {
  PLANT: 'plant',
  PLANT_POT: 'plant_pot',
  TOOL: 'tool',
};

export type ProductType = (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE];

export type SearchItem =
  | (Plant & { product_type: typeof PRODUCT_TYPE.PLANT })
  | (PlantPot & { product_type: typeof PRODUCT_TYPE.PLANT_POT })
  | (Tool & { product_type: typeof PRODUCT_TYPE.TOOL });

export const PRODUCT_TYPE_TITLE = {
  plant: 'Cây trồng',
  plant_pot: 'Chậu cây trồng',
  tool: 'Dụng cụ trồng cây',
};

export enum TRANSPORT_METHOD_CODE {
  FAST = 0,
  COD = 1,
}

export type TransportMethod =
  (typeof TRANSPORT_METHOD_CODE)[keyof typeof TRANSPORT_METHOD_CODE];

export const TRANSPORT_METHOD_TITLE: Record<TRANSPORT_METHOD_CODE, string> = {
  [TRANSPORT_METHOD_CODE.FAST]: 'Giao hàng Nhanh - 15.000đ',
  [TRANSPORT_METHOD_CODE.COD]: 'Giao hàng COD - 20.000đ',
};

export const TRANSPORT_METHOD_DESCRIPTION: Record<
  TRANSPORT_METHOD_CODE,
  string
> = {
  [TRANSPORT_METHOD_CODE.FAST]: 'Dự kiến giao hàng sau 2-3 ngày',
  [TRANSPORT_METHOD_CODE.COD]: 'Dự kiến giao hàng sau 3-5 ngày',
};

export const DELIVERY_FEE = {
  [TRANSPORT_METHOD_CODE.COD]: 20000,
  [TRANSPORT_METHOD_CODE.FAST]: 15000,
};

export enum PAYMENT_METHOD_CODE {
  VISA_MASTERCARD = 0,
  ATM_CARD = 1,
}

export type PaymentMethod =
  (typeof PAYMENT_METHOD_CODE)[keyof typeof PAYMENT_METHOD_CODE];

export const PAYMENT_METHOD_TITLE: Record<PAYMENT_METHOD_CODE, string> = {
  [PAYMENT_METHOD_CODE.VISA_MASTERCARD]: 'Thẻ VISA/MASTERCARD',
  [PAYMENT_METHOD_CODE.ATM_CARD]: 'Thẻ ATM',
};

export enum ORDER_STATUS {
  SUCCESS = 0,
  CANCELLED = 1,
}

export const ORDER_STATUS_TITLE: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.SUCCESS]: 'Đặt hàng thành công',
  [ORDER_STATUS.CANCELLED]: 'Đã hủy đơn hàng',
};

export const CASH_ON_DELIVERY_TEXT = 'Thanh toán khi nhận hàng';
export const NO_INFORMATION = 'Không có thông tin';
