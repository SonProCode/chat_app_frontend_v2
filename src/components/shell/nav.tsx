import { Anchor, Avatar, Navbar, NavbarProps, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import { ShellFooter } from "./footer";

interface Props {
  hidden: Required<NavbarProps>["hidden"];
}

export const ShellNav = (props: Props): JSX.Element => {
  const { hidden } = props;

  return (
    <Navbar width={{ sm: 250 }} hidden={hidden} hiddenBreakpoint="sm" p="lg">
      <Navbar.Section>
        <Avatar radius="xl" mb="md" color="blue" alt="logo">
          H2
        </Avatar>
      </Navbar.Section>
      <Navbar.Section grow>
        <Stack>
          <Anchor component={Link} to="/accounts/list" size="lg">
              Accounts
          </Anchor>
          <Anchor component={Link} to="/companies/list" size="lg">
                Companies
          </Anchor>
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <ShellFooter />
      </Navbar.Section>
    </Navbar>
  );
};
