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

function hasUppercase(password: string, options: RuleOptions = {}): boolean {
  return /[A-Z]/.test(password);
}

function hasLowercase(password: string, options: RuleOptions = {}): boolean {
  return /[a-z]/.test(password);
}

function hasNumber(password: string, options: RuleOptions = {}): boolean {
  return /\d/.test(password);
}

function hasUnderscore(password: string, options: RuleOptions = {}): boolean {
  return /_/.test(password);
}

export const rules = {
  hasMinimumLength,
  hasUppercase,
  hasLowercase,
  hasNumber,
  hasUnderscore,
};

export default isPasswordValid;
