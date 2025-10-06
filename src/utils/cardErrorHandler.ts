import { CARD_MESSAGES } from '@/constants/messages';
import { ValidationErrors } from '@/types/auth';
import { CardForm } from '@/types/product';

export const normalizeCardNumber = (cardNumber: string) =>
  (cardNumber || '').replace(/\D/g, '');

export const validateCardNumber = (cardNumber: string): string => {
  const raw = normalizeCardNumber(cardNumber);
  if (!raw) {
    return CARD_MESSAGES.CARD_NUMBER_REQUIRED;
  } else if (!/^\d{16}$/.test(raw)) {
    return CARD_MESSAGES.INVALID_CARD_NUMBER;
  }
  return '';
};

export const validateCardHolder = (cardHolder: string): string => {
  if (!cardHolder) {
    return CARD_MESSAGES.CARD_HOLDER_REQUIRED;
  } else if (!/^[A-Za-z\s]+$/.test(cardHolder.trim())) {
    return CARD_MESSAGES.INVALID_CARD_HOLDER;
  }
  return '';
};

export const validateExpiryDate = (expiryDate: string): string => {
  if (!expiryDate) {
    return CARD_MESSAGES.EXPIRY_DATE_REQUIRED;
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
    return CARD_MESSAGES.INVALID_EXPIRY_DATE;
  } else {
    const [mm, yy] = expiryDate.split('/');
    const month = parseInt(mm, 10);
    const year = 2000 + parseInt(yy, 10);

    const now = new Date();
    const expiry = new Date(year, month);

    if (expiry < now) {
      return CARD_MESSAGES.CARD_EXPIRED;
    }
  }
  return '';
};

export const validateCVV = (cvv: string): string => {
  if (!cvv) {
    return CARD_MESSAGES.CVV_REQUIRED;
  } else if (!/^\d{3,4}$/.test(cvv)) {
    return CARD_MESSAGES.INVALID_CVV;
  }
  return '';
};

export const validateCardData = (
  data: CardForm,
): { valid: boolean; errors: ValidationErrors<CardForm> } => {
  const errors: ValidationErrors<CardForm> = {} as ValidationErrors<CardForm>;

  errors.card_number = validateCardNumber(data.card_number || '');
  errors.card_holder = validateCardHolder(data.card_holder || '');
  errors.expiry_date = validateExpiryDate(data.expiry_date || '');
  errors.cvv = validateCVV(data.cvv || '');

  return {
    valid: Object.values(errors).every(msg => msg === ''),
    errors,
  };
};
