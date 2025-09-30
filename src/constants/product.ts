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

export type ProductType = typeof PRODUCT_TYPE[keyof typeof PRODUCT_TYPE];

export const PRODUCT_TYPE_TITLE = {
  plant: 'Cây trồng',
  plant_pot: 'Chậu cây trồng',
  tool: 'Dụng cụ trồng cây',
};
