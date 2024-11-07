import { RuleOptions } from "./options";

function isPasswordValid(
  password: string,
  rules: Array<(password: string, options?: RuleOptions) => boolean>,
  options?: RuleOptions
): boolean {
  return rules.every((rule) => rule(password, options));
}

// Define individual rule functions with options
function hasMinimumLength(
  password: string,
  options: RuleOptions = {}
): boolean {
  const minLength = options.minLength ?? 8;
  return password.length >= minLength;
}

function hasUppercase(password: string): boolean {
  for (const char of password) {
    if (char >= "A" && char <= "Z") return true;
  }
  return false;
}

function hasLowercase(password: string): boolean {
  for (const char of password) {
    if (char >= "a" && char <= "z") return true;
  }
  return false;
}

function hasNumber(password: string): boolean {
  for (const char of password) {
    if (char >= "0" && char <= "9") return true;
  }
  return false;
}

function hasUnderscore(password: string): boolean {
  for (const char of password) {
    if (char === "_") return true;
  }
  return false;
}

export const rules = {
  hasMinimumLength,
  hasUppercase,
  hasLowercase,
  hasNumber,
  hasUnderscore,
};

export default isPasswordValid;
