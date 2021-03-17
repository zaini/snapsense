import { extendTheme } from "@chakra-ui/react";

// https://coolors.co/012a4a-013a63-01497c-014f86-2a6f97-2c7da0-468faf-61a5c2-89c2d9-a9d6e5
const colors = {
  primary: {
    100: "#A9D6E5",
    200: "#89C2D9",
    300: "#61A5C2",
    400: "#468FAF",
    500: "#2C7DA0",
    600: "#2A6F97",
    700: "#014F86",
    800: "#01497C",
    900: "#013A63",
  },
};

const customTheme = extendTheme({ colors });

export default customTheme;
