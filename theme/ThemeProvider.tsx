import { DripsyProvider } from "dripsy";
import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const colorMode = useColorScheme();

  return (
    <DripsyProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
      {children}
    </DripsyProvider>
  );
}
