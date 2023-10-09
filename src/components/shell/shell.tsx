import { AppShell, AppShellProps } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { ReactNode } from "react";
import { ShellHeader } from "./header";
import { ShellNav } from "./nav";

interface Props {
  children: ReactNode;
}

export const appShellStyles: Required<AppShellProps>["styles"] = (theme) => {
  const { colorScheme, colors } = theme;
  return {
    main: {
      background: colorScheme === "dark" ? colors.dark[8] : colors.gray[0],
      overflowX: "hidden",
    },
  };
};

export const Shell = (props: Props): JSX.Element => {
  const { children } = props;
  const [nav, toggleNav] = useToggle();

  return (
    <AppShell
      styles={appShellStyles}
      header={<ShellHeader nav={nav} toggleNav={toggleNav} />}
      navbar={<ShellNav hidden={!nav} />}
      navbarOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );
};
