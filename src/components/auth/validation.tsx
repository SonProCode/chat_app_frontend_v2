import { isEmail, isNotEmpty } from "@mantine/form";
import { FormRulesRecord } from "@mantine/form/lib/types";
import { SignInForm } from "./type";

export const getSignInFormValidation = (): FormRulesRecord<SignInForm> => {
  return {
    email: isEmail("Invalid email"),
    password: isNotEmpty("Invalid password"),
  };
};
