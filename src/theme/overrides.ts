import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const commonTheme = {
  roundness: 2,
};

export const lightTheme = {
  ...MD3LightTheme,
  ...commonTheme,
};

export const darkTheme = {
  ...MD3DarkTheme,
  ...commonTheme,
};
