import { PasswordInput, Text, TextInput } from "@mantine/core";
import { GetInputProps } from "@mantine/form/lib/types";
import { SignInForm } from "../type";

interface Props {
  getInputProps: GetInputProps<SignInForm>;
}

export const SignInFields = (props: Props): JSX.Element => {
  const { getInputProps } = props;

  return (
    <>
      <TextInput
        data-testid="Email"
        label="Email"
        placeholder="test@example.com"
        withAsterisk
        {...getInputProps("email")}
      />
      <PasswordInput
        data-testid="Password"
        label="Password"
        withAsterisk
        {...getInputProps("password")}
      />
      <Text color="dimmed">
        By signing up, you agree to the Terms and Conditions and Privacy Policy.
      </Text>
    </>
  );
};
