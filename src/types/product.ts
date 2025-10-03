import { ProductType } from "@/constants/product";

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
