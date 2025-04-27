import StackLayout from "@/layouts/StackLayout";
import ThemeProvider from "@/theme/ThemeProvider";
import { AuthProvider } from "@/utils/authContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
