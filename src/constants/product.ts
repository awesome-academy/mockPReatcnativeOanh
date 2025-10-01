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
};

export const PRODUCT_TYPE = {
  PLANT: 'plant',
  PLANT_POT: 'plant_pot',
  TOOL: 'tool',
};

export type ProductType = (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE];

export const PRODUCT_TYPE_TITLE = {
  plant: 'Cây trồng',
  plant_pot: 'Chậu cây trồng',
  tool: 'Dụng cụ trồng cây',
};

export enum TRANSPORT_METHOD_CODE {
  FAST = 0,
  COD = 1,
}

export const TRANSPORT_METHOD_TITLE: Record<TRANSPORT_METHOD_CODE, string> = {
  [TRANSPORT_METHOD_CODE.FAST]: 'Giao hàng Nhanh - 15.000đ',
  [TRANSPORT_METHOD_CODE.COD]: 'Giao hàng COD - 20.000đ',
};

export enum PAYMENT_METHOD_CODE {
  VISA_MASTERCARD = 0,
  ATM_CARD = 1,
}

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

export const CASH_ON_DELIVERY_FEE = 20000;
export const FAST_DELIVERY_FEE = 15000;

export const CASH_ON_DELIVERY_TEXT = 'Thanh toán khi nhận hàng';
export const NO_INFORMATION = 'Không có thông tin';
