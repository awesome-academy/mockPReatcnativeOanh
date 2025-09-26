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
};

export type Tool = {
  id: string;
  name: string;
  image: string;
  price: number;
  remaining_quantity: number;
};
