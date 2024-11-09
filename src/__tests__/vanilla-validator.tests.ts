import isPasswordValid, { rules } from "../vanilla-validator";

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

// Define some sample test cases
describe("Password Validation (Vanilla)", () => {
  it("should validate a strong password meeting all criteria", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(strongPassword, ruleFunctions, undefined, outcomes)
    ).toBe(true);
    expect(outcomes).toEqual([]);
  });

  it("should invalidate a password without uppercase letters", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(noUppercase, ruleFunctions, undefined, outcomes)
    ).toBe(false);
    expect(outcomes).toContain(
      "Password must contain at least one uppercase letter."
    );
  });

  it("should invalidate a password without lowercase letters", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(noLowercase, ruleFunctions, undefined, outcomes)
    ).toBe(false);
    expect(outcomes).toContain(
      "Password must contain at least one lowercase letter."
    );
  });

  it("should invalidate a password without a number", () => {
    const outcomes: string[] = [];
    expect(isPasswordValid(noNumber, ruleFunctions, undefined, outcomes)).toBe(
      false
    );
    expect(outcomes).toContain("Password must contain at least one number.");
  });

  it("should invalidate a password without an underscore", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(noUnderscore, ruleFunctions, undefined, outcomes)
    ).toBe(false);
    expect(outcomes).toContain(
      "Password must contain at least one underscore."
    );
  });

  it("should allow configuring minimum length via options", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(shortPassword, ruleFunctions, optionsMinLength6, outcomes)
    ).toBe(true);
    expect(outcomes).toEqual([]);
  });

  it("should invalidate a short password with custom minimum length", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(
        shortPassword,
        ruleFunctions,
        optionsMinLength10,
        outcomes
      )
    ).toBe(false);
    expect(outcomes).toContain("Password must be at least 10 characters long.");
  });

  // Subset of rules applied
  it("should validate a password with minimum length and lowercase only", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(
        validMinLengthLowercase,
        minimumLengthAndLowercaseRules,
        undefined,
        outcomes
      )
    ).toBe(true);
    expect(outcomes).toEqual([]);
  });

  it("should invalidate a password with minimum length and lowercase only, missing lowercase", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(
        invalidNoLowercase,
        minimumLengthAndLowercaseRules,
        undefined,
        outcomes
      )
    ).toBe(false);
    expect(outcomes).toContain(
      "Password must contain at least one lowercase letter."
    );
  });

  it("should validate a password with minimum length, uppercase, and number only", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(
        validMinLengthUppercaseNumber,
        minimumLengthUppercaseNumberRules,
        undefined,
        outcomes
      )
    ).toBe(true);
    expect(outcomes).toEqual([]);
  });

  it("should invalidate a password with minimum length, uppercase, and number only, missing number", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(
        invalidNoNumber,
        minimumLengthUppercaseNumberRules,
        undefined,
        outcomes
      )
    ).toBe(false);
    expect(outcomes).toContain("Password must contain at least one number.");
  });

  it("should validate a password with minimum length and underscore only", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(
        validMinLengthUnderscore,
        minimumLengthAndUnderscoreRules,
        undefined,
        outcomes
      )
    ).toBe(true);
    expect(outcomes).toEqual([]);
  });

  it("should invalidate a password with minimum length and underscore only, missing underscore", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(
        invalidNoUnderscore,
        minimumLengthAndUnderscoreRules,
        undefined,
        outcomes
      )
    ).toBe(false);
    expect(outcomes).toContain(
      "Password must contain at least one underscore."
    );
  });
});

// Additional tests for individual rules
describe("Individual Rule Functions (Vanilla)", () => {
  it("hasMinimumLength should respect the minLength option", () => {
    const outcomes: string[] = [];
    expect(rules.hasMinimumLength("short", { minLength: 3 }, outcomes)).toBe(
      true
    );
    expect(rules.hasMinimumLength("no", { minLength: 3 }, outcomes)).toBe(
      false
    );
    expect(outcomes).toContain("Password must be at least 3 characters long.");
  });

  it("hasUppercase should return true if there is an uppercase letter", () => {
    const outcomes: string[] = [];
    expect(rules.hasUppercase("Upper", {}, outcomes)).toBe(true);
    expect(rules.hasUppercase("lower", {}, outcomes)).toBe(false);
    expect(outcomes).toContain(
      "Password must contain at least one uppercase letter."
    );
  });

  it("hasLowercase should return true if there is a lowercase letter", () => {
    const outcomes: string[] = [];
    expect(rules.hasLowercase("lower", {}, outcomes)).toBe(true);
    expect(rules.hasLowercase("UPPER", {}, outcomes)).toBe(false);
    expect(outcomes).toContain(
      "Password must contain at least one lowercase letter."
    );
  });

  it("hasNumber should return true if there is a number", () => {
    const outcomes: string[] = [];
    expect(rules.hasNumber("123", {}, outcomes)).toBe(true);
    expect(rules.hasNumber("NoNumber", {}, outcomes)).toBe(false);
    expect(outcomes).toContain("Password must contain at least one number.");
  });

  it("hasUnderscore should return true if there is an underscore", () => {
    const outcomes: string[] = [];
    expect(rules.hasUnderscore("with_underscore", {}, outcomes)).toBe(true);
    expect(rules.hasUnderscore("noUnderscore", {}, outcomes)).toBe(false);
    expect(outcomes).toContain(
      "Password must contain at least one underscore."
    );
  });
});
