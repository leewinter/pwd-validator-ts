import { RuleOptions } from "../options";

export const strongPassword = "StrongPass_1";
export const noUppercase = "weakpass_1";
export const noLowercase = "WEAKPASS_1";
export const noNumber = "NoNumber_";
export const noUnderscore = "NoUnderscore1";
export const shortPassword = "Short1_";
export const optionsMinLength6: RuleOptions = { minLength: 6 };
export const optionsMinLength10: RuleOptions = { minLength: 10 };
export const validMinLengthLowercase = "simplepassword";
export const invalidNoLowercase = "PASSWORD123";
export const validMinLengthUppercaseNumber = "Pass1234";
export const invalidNoNumber = "Password_";
export const validMinLengthUnderscore = "Password_";
export const invalidNoUnderscore = "Password";
