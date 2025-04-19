import { PaperProvider } from "react-native-paper";
import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./overrides";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
