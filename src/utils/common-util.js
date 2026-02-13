import {
  SUB_PLAN_DURATION_ANNUAL,
  SUB_PLAN_DURATION_MONTHLY,
} from 'src/constants/subscription-constants';
import { USER_ROLE } from 'src/constants/user-role';

/**
 * Returns true if a value is undefined
 * @param value
 * @returns {boolean}
 */
export const isUndefinedOrNull = (value) => {
  return typeof value === 'undefined' || value === null;
};

/**
 * Checks if String is empty or contains white spaces
 *
 * @param string String
 * @return {boolean}
 */
export const stringIsEmptyOrSpaces = (string) => {
  string = string.toString();
  return isUndefinedOrNull(string) || string.match(/^ *$/) !== null;
};

export const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)}`;
};

export const getSubscriptionDiscountedPrice = (plan) => {
  const monthly = plan.subPlanPricing.find((p) => p.duration === SUB_PLAN_DURATION_MONTHLY);
  const yearly = plan.subPlanPricing.find((p) => p.duration === SUB_PLAN_DURATION_ANNUAL);

  return {
    monthly: monthly?.isDiscountActive ? monthly.price - monthly.discountAmount : monthly?.price,
    yearly: yearly?.isDiscountActive ? yearly.price - yearly.discountAmount : yearly?.price,
  };
};

export const getUserRoleLabel = (value) => {
  const option = USER_ROLE.find((option) => option.value === value);
  return option ? option.label : 'Unknown';
};
