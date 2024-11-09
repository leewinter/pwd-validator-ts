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
function mustInclude(
  password: string,
  options: RuleOptions = {},
  outcome: string[] = []
): boolean {
  const regex = new RegExp(`${options.includeWord}`, "i"); // 'i' makes it case-insensitive

  const doesInclude = regex.test(password);

  if (!doesInclude)
    outcome.push(`Password must include ${options.includeWord}`);
  return doesInclude;
}

function mustIncludeStatic(
  password: string,
  options: RuleOptions = {},
  outcome: string[] = []
): boolean {
  const minLength = 18;
  const valid = password.length >= minLength;
  console.log("valid", valid);
  if (!valid) outcome.push(`Password must be at least 18 chars`);
  return valid;
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

  it("should not meet extended criteria and outputs reasons", () => {
    let outcomeResults: string[] = [];
    expect(
      isPasswordValid(
        strongPassword,
        [mustInclude, mustIncludeStatic],
        optionsIncludeWordBanana,
        outcomeResults
      )
    ).toBe(false);
    expect(outcomeResults).toHaveLength(2);
  });
});
