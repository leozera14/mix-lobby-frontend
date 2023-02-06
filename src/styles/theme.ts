import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  styles: {
    global: () => ({
      body: {
        bg: "white",
      },
    }),
  },
  overrides: {
    styles: {
      "*": {
        boxShadow: "none",
      },
    },
  },
  zIndices: {
    default: 1,
    behind: "-1000",
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "Roboto Mono",
  },
});
