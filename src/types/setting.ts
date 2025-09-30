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
  id: string;
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
  status: number;
  order_date: string;
};
