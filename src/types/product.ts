import { PaymentMethod, ProductType, TransportMethod } from "@/constants/product";

export type Plant = {
  id: string;
  name: string;
  image: string;
  size: string;
  price: number;
  origin: string;
  remaining_quantity: number;
  type: number;
  tag: string;
};

export type PlantPot = {
  id: string;
  name: string;
  image: string;
  price: number;
  remaining_quantity: number;
  size?: string;
  origin?: string;
};

export type Tool = {
  id: string;
  name: string;
  image: string;
  price: number;
  remaining_quantity: number;
  size?: string;
  origin?: string;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  remaining_quantity: number;
  product_type: ProductType;
  quantity: number;
  selected: boolean;
};

export type CheckoutFormType = {
  email?: string;
  userName?: string;
  phoneNumber?: string;
  address?: string;
  uid?: string;
  transport_method: TransportMethod;
  payment_method: PaymentMethod;
  price?: number;
  total?: number;
  card_number?: string;
  card_holder?: string;
  expiry_date?: string;
  cvv?: string;
}

export type CardForm = {
  card_number: string;
  card_holder: string;
  expiry_date: string;
  cvv: string;
};
