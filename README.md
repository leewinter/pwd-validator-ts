# pwd-validator-ts

[![Run Jest Tests](https://github.com/leewinter/pwd-validator-ts/actions/workflows/jest-tests.yml/badge.svg)](https://github.com/leewinter/pwd-validator-ts/actions/workflows/jest-tests.yml)

A simple, extensible password validator written in TypeScript. It allows for customizable validation rules to meet different password policies.

## Getting started

### Installation

To install the package directly from GitHub:

```console
npm install github:leewinter/pwd-validator-ts
```

### Importing the Validators

The package provides two different validators: a character-based `vanillaValidator` and a regex-based `regexValidator`.

```typescript
// Import the default export from the package
import pwdValidators from "pwd-validator-ts";

// Destructure the validators
const { vanillaValidator, regexValidator } = pwdValidators;
```

### Using the Validators

You can validate passwords using either the `vanillaValidator` or `regexValidator`. Each validator has an `isPasswordValid` function and a set of predefined rules that you can mix and match as needed.

```typescript
// Example password to validate
const password = "MyStrongPassword123";

// Using the vanillaValidator
const isVanillaValid = vanillaValidator.isPasswordValid(password, [
  vanillaValidator.rules.hasMinimumLength,
  vanillaValidator.rules.hasUppercase,
  vanillaValidator.rules.hasLowercase,
]);

console.log("Is Vanilla Validator Password Valid:", isVanillaValid);

// Using the regexValidator
const isRegexValid = regexValidator.isPasswordValid(password, [
  regexValidator.rules.hasMinimumLength,
  regexValidator.rules.hasUppercase,
  regexValidator.rules.hasLowercase,
]);

console.log("Is Regex Validator Password Valid:", isRegexValid);
```

### Rule Options

You can configure the validators by passing options to the `isPasswordValid` function. The available options include:

```typescript
export type RuleOptions = {
  /** The minimum length allowed for the hasMinimumLength rule. */
  minLength?: number;
  /** Whether to stop execution if the rule fails. Default is true. */
  returnOnFail?: Boolean;
};
```

The `returnOnFail` property is particularly useful if you want to either stop validation after the first failed rule (`returnOnFail: true`) or continue validating to collect all failure reasons (`returnOnFail: false`).

#### Example with Options

```typescript
const isVanillaValid = vanillaValidator.isPasswordValid(
  password,
  [
    vanillaValidator.rules.hasMinimumLength,
    vanillaValidator.rules.hasUppercase,
    vanillaValidator.rules.hasLowercase,
  ],
  { returnOnFail: false } // Continue validating even after failures
);

console.log(
  "Is Vanilla Validator Password Valid with Options:",
  isVanillaValid
);
```

### Built-In Rules

The package provides the following predefined rules that you can use for password validation:

- `hasMinimumLength`: Ensures the password is at least a certain length (default: 8 characters).
- `hasUppercase`: Ensures the password contains at least one uppercase letter.
- `hasLowercase`: Ensures the password contains at least one lowercase letter.
- `hasNumber`: Ensures the password contains at least one number.
- `hasUnderscore`: Ensures the password contains at least one underscore (`_`).

#### Example Rule Usage

```typescript
const isRegexValid = regexValidator.isPasswordValid(password, [
  regexValidator.rules.hasMinimumLength,
  regexValidator.rules.hasNumber,
  regexValidator.rules.hasUnderscore,
]);

console.log(
  "Is Regex Validator Password Valid with Number and Underscore Rules:",
  isRegexValid
);
```

### Collecting Validation Outcomes

You can pass an `outcomes` array to collect messages indicating why a password did not meet certain criteria. This helps provide detailed feedback to the user.

#### Example with Outcomes

```typescript
const outcomes: string[] = [];
const isValid = regexValidator.isPasswordValid(
  password,
  [
    regexValidator.rules.hasMinimumLength,
    regexValidator.rules.hasUppercase,
    regexValidator.rules.hasLowercase,
    regexValidator.rules.hasNumber,
  ],
  { returnOnFail: false },
  outcomes
);

console.log("Is Password Valid:", isValid);
console.log("Validation Outcomes:", outcomes);
// Output example: ["Password must contain at least one number."]
```

### Extending Validation with Custom Rules

The validator can be extended with custom rules to meet more specific password policies. Below are examples of how to add new custom rules.

#### Custom Rule Example

```typescript
// Custom rule to ensure the password contains the word 'Strong'
function customRuleMustIncludeStrong(
  password: string,
  options: RuleOptions = {},
  outcomes: string[] = []
): boolean {
  const wordToInclude = "Strong";
  const regex = new RegExp(`${wordToInclude}`, "i"); // 'i' makes it case-insensitive

  const doesInclude = regex.test(password);

  if (!doesInclude) {
    outcomes.push(`Password must include the word '${wordToInclude}'.`);
  }
  return doesInclude;
}

// Using the custom rule
const customOutcomes: string[] = [];
const customPassword = "MyStrongPassword123";
const isCustomValid = regexValidator.isPasswordValid(
  customPassword,
  [
    regexValidator.rules.hasMinimumLength,
    regexValidator.rules.hasUppercase,
    customRuleMustIncludeStrong,
  ],
  {},
  customOutcomes
);

console.log("Is Custom Validator Password Valid:", isCustomValid);
console.log("Custom Validation Outcomes:", customOutcomes);
```

### Extending the Ruleset

The flexibility of the password validation comes from the use of individual rules as an array:

- **Single Responsibility**: Each rule can be easily tested for its single responsibility.
- **Customizability**: You can easily pick and choose which rules to apply based on your application's requirements.
- **Extendability**: You can add custom rules on top of the base ruleset. For example, you may have additional business logic or security requirements that necessitate extra checks.

For a practical example of extending the ruleset, check the extended validator tests: [extend-validator.tests.ts](./src/__tests__/extend-validator.tests.ts).

### Options for Global Settings

Options allow you to apply global settings to all rules. For example:

- `minLength`: Set the minimum password length.
- `returnOnFail`: Decide whether to stop after the first failure or continue validating all rules.

These settings can be applied to provide consistent behavior across multiple rules.

### Summary

The `pwd-validator-ts` package provides flexible and extendable password validation through two built-in validators (`vanillaValidator` and `regexValidator`). The use of individual rule functions, combined with configurable options, allows you to meet various password complexity requirements and extend the validation easily to accommodate custom rules.

```typescript
// Example: Validate with custom rule and collect reasons for failure
const outcomes: string[] = [];
const isValid = regexValidator.isPasswordValid(
  "WeakPass",
  [
    regexValidator.rules.hasMinimumLength,
    regexValidator.rules.hasUppercase,
    regexValidator.rules.hasLowercase,
    customRuleMustIncludeStrong,
  ],
  { returnOnFail: false },
  outcomes
);

console.log("Is Password Valid:", isValid);
console.log("Validation Outcomes:", outcomes);
```

### Contributing

Feel free to extend and contribute to make `pwd-validator-ts` even better!

To contribute to the project:

1. Clone the repository.
2. Install dependencies:

```console
npm install
```

3. Run tests:

```console
npm test
```
