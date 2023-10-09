import { BadgeProps, BadgeStylesNames, BadgeStylesParams } from "@mantine/core";
import { ThemeComponent } from "./type";

export const ThemeBadge: ThemeComponent<
  BadgeProps,
  BadgeStylesNames,
  BadgeStylesParams
> = {
  defaultProps: () => ({
    // "filled" is too strong to be the default of H2
    variant: "dot",
    // "md" is too small for Japanese
    size: "lg",
  }),
};
