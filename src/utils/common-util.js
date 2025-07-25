/**
 * Returns true if a value is undefined
 * @param value
 * @returns {boolean}
 */
const isUndefinedOrNull = (value) => {
  return typeof value === 'undefined' || value === null;
};

/**
 * Rounds a number to the provided no. of decimal places
 *
 * @param value Number to be rounded
 * @param decimalPlaces No. of decimal places. By default it's 2
 * @return {number} Rounded Number
 */
const roundNumber = (value, decimalPlaces = 2) => {
  if (isNaN(value)) return 0;
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round((value + Number.EPSILON) * factorOfTen) / factorOfTen;
};

/**
 * Checks if String is empty or contains white spaces
 *
 * @param string String
 * @return {boolean}
 */
const stringIsEmptyOrSpaces = (string) => {
  string = string.toString();
  return isUndefinedOrNull(string) || string.match(/^ *$/) !== null;
};

const getDirectImageLink = (imageId) => {
  if (imageId) {
    return `https://drive.google.com/thumbnail?id=${imageId}`;
    //return `https://drive.google.com/uc?id=${imageId}`;
  }
  // If the link doesn't match the expected pattern
  return null;
};

const calculateMonthDifference = (date) => {
  const scheduledDate = new Date(date);

  const currentDate = new Date();

  // Calculate the difference in months
  const differenceInMs = scheduledDate.getTime() - currentDate.getTime();

  // Determine if the date is within the same month
  return differenceInMs <= 30 * 24 * 60 * 60 * 1000;
};

const validateFormik = (formik) => {
  // Flatten the initialValues structure to include nested paths
  const fieldsToValidateAndTouch = [];

  // Recursive function to handle nested objects
  const flattenObject = (obj, prefix = '') => {
    Object.keys(obj).forEach((key) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        flattenObject(obj[key], path);
      } else {
        fieldsToValidateAndTouch.push(path);
      }
    });
  };

  flattenObject(formik.initialValues);

  // Validate the form
  formik.validateForm().then(() => {
    // Set touched for all fields (including nested paths)
    const touchedFields = {};
    fieldsToValidateAndTouch.forEach((field) => {
      touchedFields[field] = true;
    });
    formik.setTouched(touchedFields);
  });

  return;
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  isUndefinedOrNull,
  roundNumber,
  stringIsEmptyOrSpaces,
  getDirectImageLink,
  calculateMonthDifference,
  validateFormik,
};
