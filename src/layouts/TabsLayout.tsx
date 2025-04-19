import { Tabs } from "expo-router";
import { ReactNode } from "react";
import { useTheme } from "react-native-paper";
import "react-native-reanimated";

export default function TabsLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerTintColor: theme.colors.onSurfaceVariant,
        headerStyle: {
          backgroundColor: theme.colors.surfaceVariant,
        },

        tabBarActiveTintColor: theme.colors.onSurfaceVariant,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceVariant,
        },
      }}
    >
      {children}
    </Tabs>
  );
}
