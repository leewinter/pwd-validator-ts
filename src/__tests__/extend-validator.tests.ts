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

const optionsIncludeWordStrong: RuleOptions = { includeWord: "Strong" };
const optionsIncludeWordBanana: RuleOptions = { includeWord: "Banana" };

// Custom rule to extend standard ruleset
function mustInclude(password: string, options: RuleOptions = {}): boolean {
  const regex = new RegExp(`${options.includeWord}`, "i"); // 'i' makes it case-insensitive
  return regex.test(password);
}

describe("Extended Password Validation", () => {
  it("should validate a strong password meeting extended criteria", () => {
    expect(
      isPasswordValid(
        strongPassword,
        [...ruleFunctions, mustInclude],
        optionsIncludeWordStrong
      )
    ).toBe(true);
  });

  it("should validate a strong password not meeting extended criteria", () => {
    expect(
      isPasswordValid(
        strongPassword,
        [...ruleFunctions, mustInclude],
        optionsIncludeWordBanana
      )
    ).toBe(false);
  });
});
