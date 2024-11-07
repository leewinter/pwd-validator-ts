import {
  default as isPasswordValidVanilla,
  rules as rulesVanilla,
} from "./vanilla-validator";
import isPasswordValid, { rules } from "./regex-validator";

export default {
  vanillaValidator: {
    isPasswordValid: isPasswordValidVanilla,
    rules: rulesVanilla,
  },
  regexValidator: {
    isPasswordValid,
    rules,
  },
};
