import { Card, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AuthShell } from "@/components/shell/auth-shell";
import { CardStyles } from "../styles";
import { SignInForm } from "../type";
import { getSignInFormValidation } from "../validation";
import { SignInFields } from "./fields";
import { SignInFooter } from "./footer";
import { SignInHeader } from "./header";
import { useSignIn } from "@/server/hooks/useSignIn.ts";

export const SignIn = (): JSX.Element => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const form = useForm<SignInForm>({
    initialValues: { email: "", password: "" },
    validate: getSignInFormValidation(),
  });

  const submit = async (values: SignInForm) => {
    signIn.mutate(values, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <Card radius="xl" withBorder padding="lg" shadow="lg" sx={CardStyles}>
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <SignInHeader />
          <SignInFields
            getInputProps={(path, options) => {
              return form.getInputProps(path, options);
            }}
          />
          <SignInFooter />
        </Stack>
      </form>
    </Card>
  );
};

SignIn.Layout = AuthShell;
