import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#c96979",
    200: "#c25668",
    300: "#bb4458",
    400: "#a93d4f",
    500: "#9C3848",
    600: "#832f3d",
    700: "#702935",
    800: "#5e222c",
    900: "#4b1b23",
  },
};

const customTheme = extendTheme({ colors });

export default customTheme;
