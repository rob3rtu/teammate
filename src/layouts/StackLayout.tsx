import { Stack } from "expo-router";
import { ReactNode } from "react";
import { useTheme } from "react-native-paper";

export default function StackLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTintColor: theme.colors.onSurfaceVariant,
        headerStyle: { backgroundColor: theme.colors.surfaceVariant },
      }}
    >
      {children}
    </Stack>
  );
}
