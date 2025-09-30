import { AUTH_MESSAGES } from "@/constants/messages";
import { Profile, User, ValidationErrors } from "@/types/auth";

export type AuthError = {
  email?: string;
  password?: string;
  global?: string;
};

export const getAuthErrorMessage = (errorCode: string): AuthError =>  {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return { email: AUTH_MESSAGES.EMAIL_ALREADY_IN_USE };
    case 'auth/user-not-found':
      return { email: AUTH_MESSAGES.EMAIL_NOT_FOUND };
    case 'auth/wrong-password':
      return { password: AUTH_MESSAGES.WRONG_PASSWORD };
    case 'auth/network-request-failed':
      return { global: AUTH_MESSAGES.NETWORK_REQUEST_FAILED };
    default:
      return { password: AUTH_MESSAGES.INVALID_CREDENTIALS };
  }
}

export const validateEmail = (email: string): string => {
  if (!email) {
    return AUTH_MESSAGES.EMAIL_REQUIRED;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    return AUTH_MESSAGES.INVALID_EMAIL;
  }
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return AUTH_MESSAGES.PASSWORD_REQUIRED;
  } else if (password.length < 6) {
    return AUTH_MESSAGES.PASSWORD_TOO_SHORT;
  }
  return "";
};

export const validateUserName = (userName: string, type: "login" | "register"): string => {
  if (type === "register") {
    if (!userName || userName.trim().length < 3) {
      return AUTH_MESSAGES.USERNAME_REQUIRED;
    }
  }
  return "";
};

export const validateAddress = (address: string): string => {
  if (!address) {
    return AUTH_MESSAGES.ADDRESS_REQUIRED;
  }
  return "";
};

export const validatePhoneNumber = (phoneNumber: string, type: "login" | "register"): string => {
  if (type === "register") {
    if (!phoneNumber) {
      return AUTH_MESSAGES.PHONE_NUMBER_REQUIRED;
    } else if (!/^[0-9]{9,15}$/.test(phoneNumber)) {
      return AUTH_MESSAGES.INVALID_PHONE_NUMBER;
    }
  }
  return "";
};

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string,
  type: "login" | "register"
): string => {
  if (type === "register") {
    if (!confirmPassword) {
      return AUTH_MESSAGES.CONFIRM_PASSWORD_REQUIRED;
    } else if (confirmPassword !== password) {
      return AUTH_MESSAGES.PASSWORDS_DO_NOT_MATCH;
    }
  }
  return "";
};

export const validateAuthData = (
  data: User,
  type: "login" | "register"
): { valid: boolean; errors: ValidationErrors<User> } => {
  const errors: ValidationErrors<User> = {} as ValidationErrors<User>;

  errors.email = validateEmail(data.email || "");
  errors.password = validatePassword(data.password || "");
  errors.userName = validateUserName(data.userName || "", type);
  errors.phoneNumber = validatePhoneNumber(data.phoneNumber || "", type);
  errors.confirmPassword = validateConfirmPassword(
    data.confirmPassword || "",
    data.password || "",
    type
  );

  return {
    valid: Object.values(errors).every((msg) => msg === ""),
    errors,
  };
};

export const validateEditProfile = (
  data: Profile,
): { valid: boolean; errors: ValidationErrors<Profile> } => {
  const errors: ValidationErrors<Profile> = {} as ValidationErrors<Profile>;

  errors.email = validateEmail(data.email || "");
  errors.phoneNumber = validatePhoneNumber(data.phoneNumber || "", 'register');
  errors.address = validateAddress(data.address || "");
  errors.userName = validateUserName(data.userName || "", 'register');

  return {
    valid: Object.values(errors).every((msg) => msg === ""),
    errors,
  };
};
