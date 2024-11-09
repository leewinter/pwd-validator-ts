// Import the default password validator and rules from vanilla-validator.
// This validator uses a more manual approach for checking password validity.
import {
  default as isPasswordValidVanilla,
  rules as rulesVanilla,
} from "./vanilla-validator";

// Import the password validator and rules from regex-validator.
// This validator uses regex-based functions for checking password validity.
import isPasswordValid, { rules } from "./regex-validator";

// Export an object containing both the vanilla and regex validators.
// This provides flexibility for different use cases where either
// a simple manual check or a regex-based check is desired.
export default {
  // Vanilla validator: Uses a manual approach for password validation.
  vanillaValidator: {
    // Function to validate passwords based on provided rules.
    isPasswordValid: isPasswordValidVanilla,
    // Predefined set of rule functions that can be used with the validator.
    rules: rulesVanilla,
  },
  // Regex validator: Uses regular expressions to validate password complexity.
  regexValidator: {
    // Function to validate passwords based on provided regex-based rules.
    isPasswordValid,
    // Predefined set of regex rule functions for password validation.
    rules,
  },
};
