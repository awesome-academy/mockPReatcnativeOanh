import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Profile } from './auth';

export type Question = {
  id: number;
  question: string;
  answer: string;
};

export type Tutorial = {
  id: number;
  plant: {
    id: number;
    name: string;
    image: string;
    type: number;
  };
  difficulty: string;
  basic_knowledge: Step[];
  stages: Step[];
};

export type Step = {
  step: string;
  description: string;
};

export type Order = {
  id?: string;
  user: Profile;
  products: {
    id: string;
    name: string;
    image: string;
    product_type: string;
    price: number;
    quantity: number;
  }[];
  payment_amount: number;
  transport_method: number;
  payment_method: number;
  status?: number;
  order_date?: string;
  card_number?: string | null;
  card_holder?: string | null;
  expiry_date?: string | null;
  cvv?: string | null;
};

export type Notification = {
  created_at: FirebaseFirestoreTypes.Timestamp;
  uid: string;
  title: string;
  order_id: string;
  read: boolean;
  price: number;
  number_of_products: number;
};
