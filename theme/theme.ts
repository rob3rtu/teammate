import { makeTheme } from "dripsy";
import { darkColors, lightColors } from "./colors";

const darkTheme = makeTheme({
  types: {
    reactNativeTypesOnly: true,
  },
  colors: darkColors,
});

type MyTheme = typeof darkTheme;

declare module "dripsy" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}

const lightTheme: typeof darkTheme = {
  ...darkTheme,
  colors: lightColors,
};

export { darkTheme, lightTheme };
