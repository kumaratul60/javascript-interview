const isValidEmail = function (email) {
  if (/^[^@ ]+@[^@ ]+\.[^@ \.]{2,}$/.test(email)) {
    return "email is valid";
  } else {
    return "email is invalid";
  }
};

const isValidPhone = function (phone) {
  if (/^[\\(]\d{3}[\\)]\s\d{3}-\d{4}$/.test(phone)) {
    return "phone number is valid";
  } else {
    return "phone number is invalid";
  }
};

function isEmpty(value) {
  if (/^\s*$/.test(value)) {
    return "string is empty or contains only spaces";
  } else {
    return "string is not empty and does not contain spaces";
  }
}

export { isValidEmail, isValidPhone, isEmpty };


export const regexPatterns = {
    numbersOnly: /^\d*$/, // Matches only numbers (0-9)
    lettersOnly: /^[A-Za-z]*$/, // Matches only letters (A-Z, a-z)
    lowercaseOnly: /^[a-z]*$/, // Matches only lowercase letters
    uppercaseOnly: /^[A-Z]*$/, // Matches only uppercase letters
    alphanumeric: /^[A-Za-z0-9]*$/, // Matches letters and numbers
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Matches a valid email format
    phoneNumber: /^\+?[0-9]{7,15}$/, // Matches international phone numbers (7-15 digits, optional +)
    noSpecialChars: /^[A-Za-z0-9 ]*$/, // Allows letters, numbers, and spaces (no special characters)
    strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
};