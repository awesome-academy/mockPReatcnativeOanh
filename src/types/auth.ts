export type User = {
  email: string;
  phoneNumber?: string;
  userName?: string;
  password: string;
  confirmPassword?: string;
};

export type ValidationErrors<T> = {
  [K in keyof T]: string;
};
