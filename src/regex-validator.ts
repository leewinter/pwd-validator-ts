import { RuleOptions } from "./options";

/**
 * Validates a password against a set of rules.
 *
 * @param password - The password to be validated.
 * @param rules - An array of rule functions that determine password validity.
 * @param options - Configuration options for the validation, including `returnOnFail` to control behavior.
 * @param outcomes - Optional array to collect messages indicating why validation failed.
 * @returns A boolean indicating whether the password is valid.
 */
function isPasswordValid(
  password: string,
  rules: Array<
    (password: string, options?: RuleOptions, outcomes?: string[]) => boolean
  >,
  options: RuleOptions = { returnOnFail: true },
  outcomes?: string[]
): boolean {
  // If `returnOnFail` is true, stop checking as soon as a rule fails and return false
  if (options.returnOnFail) {
    return rules.every((rule) => rule(password, options, outcomes));
  }

  // If `returnOnFail` is false, execute all rules to collect all possible failure reasons
  let allPassed = true;
  rules.forEach((rule) => {
    if (!rule(password, options, outcomes)) {
      allPassed = false;
    }
  });
  return allPassed;
}

// Define individual rule functions with options

/**
 * Checks if the password meets the minimum length requirement.
 *
 * @param password - The password to be validated.
 * @param options - Options object that may contain a custom minimum length.
 * @param outcomes - Optional array to collect messages indicating why validation failed.
 * @returns A boolean indicating whether the password meets the minimum length requirement.
 */
function hasMinimumLength(
  password: string,
  options: RuleOptions = {},
  outcomes?: string[]
): boolean {
  const minLength = options.minLength ?? 8; // Default minimum length is 8 if not specified
  const isValid = password.length >= minLength;
  if (!isValid && outcomes) {
    outcomes.push(`Password must be at least ${minLength} characters long.`);
  }
  return isValid;
}

/**
 * Checks if the password contains at least one uppercase letter.
 *
 * @param password - The password to be validated.
 * @param options - Unused but provided for consistency with other rule functions.
 * @param outcomes - Optional array to collect messages indicating why validation failed.
 * @returns A boolean indicating whether the password contains an uppercase letter.
 */
function hasUppercase(
  password: string,
  options: RuleOptions = {},
  outcomes?: string[]
): boolean {
  const isValid = /[A-Z]/.test(password);
  if (!isValid && outcomes) {
    outcomes.push("Password must contain at least one uppercase letter.");
  }
  return isValid;
}

/**
 * Checks if the password contains at least one lowercase letter.
 *
 * @param password - The password to be validated.
 * @param options - Unused but provided for consistency with other rule functions.
 * @param outcomes - Optional array to collect messages indicating why validation failed.
 * @returns A boolean indicating whether the password contains a lowercase letter.
 */
function hasLowercase(
  password: string,
  options: RuleOptions = {},
  outcomes?: string[]
): boolean {
  const isValid = /[a-z]/.test(password);
  if (!isValid && outcomes) {
    outcomes.push("Password must contain at least one lowercase letter.");
  }
  return isValid;
}

/**
 * Checks if the password contains at least one number.
 *
 * @param password - The password to be validated.
 * @param options - Unused but provided for consistency with other rule functions.
 * @param outcomes - Optional array to collect messages indicating why validation failed.
 * @returns A boolean indicating whether the password contains a number.
 */
function hasNumber(
  password: string,
  options: RuleOptions = {},
  outcomes?: string[]
): boolean {
  const isValid = /\d/.test(password);
  if (!isValid && outcomes) {
    outcomes.push("Password must contain at least one number.");
  }
  return isValid;
}

/**
 * Checks if the password contains at least one underscore.
 *
 * @param password - The password to be validated.
 * @param options - Unused but provided for consistency with other rule functions.
 * @param outcomes - Optional array to collect messages indicating why validation failed.
 * @returns A boolean indicating whether the password contains an underscore.
 */
function hasUnderscore(
  password: string,
  options: RuleOptions = {},
  outcomes?: string[]
): boolean {
  const isValid = /_/.test(password);
  if (!isValid && outcomes) {
    outcomes.push("Password must contain at least one underscore.");
  }
  return isValid;
}

// Exporting the rules as an object for easy access
export const rules = {
  hasMinimumLength,
  hasUppercase,
  hasLowercase,
  hasNumber,
  hasUnderscore,
};

// Export the main validation function as the default export
export default isPasswordValid;
