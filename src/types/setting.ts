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
}

export type Step = {
  step: string,
  description: string,
}
