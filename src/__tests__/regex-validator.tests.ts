import isPasswordValid, { rules } from "../regex-validator";

import {
  strongPassword,
  noUppercase,
  noLowercase,
  noNumber,
  noUnderscore,
  shortPassword,
  optionsMinLength6,
  optionsMinLength10,
  validMinLengthLowercase,
  invalidNoLowercase,
  validMinLengthUppercaseNumber,
  invalidNoNumber,
  validMinLengthUnderscore,
  invalidNoUnderscore,
} from "./data.mocks";

// Full ruleset
const ruleFunctions = [
  rules.hasMinimumLength,
  rules.hasUppercase,
  rules.hasLowercase,
  rules.hasNumber,
  rules.hasUnderscore,
];

// Subset of rules
const minimumLengthAndLowercaseRules = [
  rules.hasMinimumLength,
  rules.hasLowercase,
];
const minimumLengthUppercaseNumberRules = [
  rules.hasMinimumLength,
  rules.hasUppercase,
  rules.hasNumber,
];
const minimumLengthAndUnderscoreRules = [
  rules.hasMinimumLength,
  rules.hasUnderscore,
];

describe("Regex Password Validation", () => {
  it("should validate a strong password meeting all criteria", () => {
    expect(isPasswordValid(strongPassword, ruleFunctions)).toBe(true);
  });

  it("should invalidate a password without uppercase letters", () => {
    expect(isPasswordValid(noUppercase, ruleFunctions)).toBe(false);
  });

  it("should invalidate a password without lowercase letters", () => {
    expect(isPasswordValid(noLowercase, ruleFunctions)).toBe(false);
  });

  it("should invalidate a password without a number", () => {
    expect(isPasswordValid(noNumber, ruleFunctions)).toBe(false);
  });

  it("should invalidate a password without an underscore", () => {
    expect(isPasswordValid(noUnderscore, ruleFunctions)).toBe(false);
  });

  it("should allow configuring minimum length via options", () => {
    expect(
      isPasswordValid(shortPassword, ruleFunctions, optionsMinLength6)
    ).toBe(true);
  });

  it("should invalidate a short password with custom minimum length", () => {
    expect(
      isPasswordValid(shortPassword, ruleFunctions, optionsMinLength10)
    ).toBe(false);
  });

  // Subset of rules applied
  it("should validate a password with minimum length and lowercase only", () => {
    expect(
      isPasswordValid(validMinLengthLowercase, minimumLengthAndLowercaseRules)
    ).toBe(true);
  });

  it("should invalidate a password with minimum length and lowercase only, missing lowercase", () => {
    expect(
      isPasswordValid(invalidNoLowercase, minimumLengthAndLowercaseRules)
    ).toBe(false);
  });

  it("should validate a password with minimum length, uppercase, and number only", () => {
    expect(
      isPasswordValid(
        validMinLengthUppercaseNumber,
        minimumLengthUppercaseNumberRules
      )
    ).toBe(true);
  });

  it("should invalidate a password with minimum length, uppercase, and number only, missing number", () => {
    expect(
      isPasswordValid(invalidNoNumber, minimumLengthUppercaseNumberRules)
    ).toBe(false);
  });

  it("should validate a password with minimum length and underscore only", () => {
    expect(
      isPasswordValid(validMinLengthUnderscore, minimumLengthAndUnderscoreRules)
    ).toBe(true);
  });

  it("should invalidate a password with minimum length and underscore only, missing underscore", () => {
    expect(
      isPasswordValid(invalidNoUnderscore, minimumLengthAndUnderscoreRules)
    ).toBe(false);
  });
});

// Additional tests for individual rules
describe("Individual Rule Functions", () => {
  it("hasMinimumLength should respect the minLength option", () => {
    expect(rules.hasMinimumLength("short", { minLength: 3 })).toBe(true);
    expect(rules.hasMinimumLength("no", { minLength: 3 })).toBe(false);
  });

  it("hasUppercase should return true if there is an uppercase letter", () => {
    expect(rules.hasUppercase("Upper")).toBe(true);
    expect(rules.hasUppercase("lower")).toBe(false);
  });

  it("hasLowercase should return true if there is a lowercase letter", () => {
    expect(rules.hasLowercase("lower")).toBe(true);
    expect(rules.hasLowercase("UPPER")).toBe(false);
  });

  it("hasNumber should return true if there is a number", () => {
    expect(rules.hasNumber("123")).toBe(true);
    expect(rules.hasNumber("NoNumber")).toBe(false);
  });

  it("hasUnderscore should return true if there is an underscore", () => {
    expect(rules.hasUnderscore("with_underscore")).toBe(true);
    expect(rules.hasUnderscore("noUnderscore")).toBe(false);
  });
});
