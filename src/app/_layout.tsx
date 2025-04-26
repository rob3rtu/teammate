import StackLayout from "@/layouts/StackLayout";
import ThemeProvider from "@/theme/ThemeProvider";
import { AuthProvider } from "@/utils/authContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <StackLayout>
          <Stack.Screen
            name="(protected)"
            options={{
              headerShown: false,
              animation: "none",
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerTitle: "Teammate",
              animation: "none",
            }}
          />
        </StackLayout>
      </AuthProvider>
    </ThemeProvider>
  );
}
