import { Button } from "@mantine/core";

export const SignInFooter = (): JSX.Element => {
  return (
    <>
      <Button radius="xl" data-testid="Sign In" type="submit" variant="filled">
        Sign In
      </Button>
    </>
  );
};
