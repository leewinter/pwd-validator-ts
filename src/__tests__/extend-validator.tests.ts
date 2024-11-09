import isPasswordValid, { rules } from "../regex-validator";
import { RuleOptions } from "../options";

import { strongPassword } from "./data.mocks";

// Full ruleset
const ruleFunctions = [
  rules.hasMinimumLength,
  rules.hasUppercase,
  rules.hasLowercase,
  rules.hasNumber,
  rules.hasUnderscore,
];

// Custom rule to extend standard ruleset
function customRuleMustIncludeStrong(
  password: string,
  options: RuleOptions = {},
  outcomes: string[] = []
): boolean {
  const wordToInclude = "Strong";
  const regex = new RegExp(`${wordToInclude}`, "i"); // 'i' makes it case-insensitive

  const doesInclude = regex.test(password);

  if (!doesInclude) outcomes.push(`Password must include ${wordToInclude}`);
  return doesInclude;
}

// Custom rule to extend standard ruleset
function customRuleMustIncludeBanana(
  password: string,
  options: RuleOptions = {},
  outcomes: string[] = []
): boolean {
  const wordToInclude = "Banana";
  const regex = new RegExp(`${wordToInclude}`, "i"); // 'i' makes it case-insensitive

  const doesInclude = regex.test(password);

  if (!doesInclude) outcomes.push(`Password must include ${wordToInclude}`);
  return doesInclude;
}

function mustIncludeStatic(
  password: string,
  options: RuleOptions = {},
  outcomes: string[] = []
): boolean {
  const minLength = 18;
  const valid = password.length >= minLength;

  if (!valid)
    outcomes.push(`Password must be at least ${minLength} characters long.`);
  return valid;
}

describe("Extended Password Validation", () => {
  it("should validate a strong password meeting extended criteria", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(
        strongPassword,
        [...ruleFunctions, customRuleMustIncludeStrong],
        {},
        outcomes
      )
    ).toBe(true);
    expect(outcomes).toEqual([]);
  });

  it("should invalidate a strong password not meeting extended criteria", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(
        strongPassword,
        [...ruleFunctions, customRuleMustIncludeBanana],
        {},
        outcomes
      )
    ).toBe(false);
    expect(outcomes).toContain("Password must include Banana");
  });

  it("should not meet extended criteria and outputs reasons", () => {
    const outcomes: string[] = [];
    expect(
      isPasswordValid(strongPassword, [mustIncludeStatic], {}, outcomes)
    ).toBe(false);
    expect(outcomes).toHaveLength(1);
    expect(outcomes).toContain("Password must be at least 18 characters long.");
  });
});
