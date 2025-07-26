import StackLayout from "@/layouts/StackLayout";
import ThemeProvider from "@/theme/ThemeProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { UserProfile } from "@/types/auth";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

interface AuthContextType {
  authenticatedAccount: UserProfile | null;
}

export const AuthContext = createContext<AuthContextType>({
  authenticatedAccount: null,
});

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [authenticatedAccount, setAuthenticatedAccount] =
    useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    };

    loadResources();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setAuthenticatedAccount(data);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    fetchProfile();
  }, [session]);

  useEffect(() => {
    const setuser = async () => {
      if (authenticatedAccount) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setIsAppReady(true);
        SplashScreen.hideAsync();
      }
    };

    setuser();
  }, [authenticatedAccount]);

  if (!isAppReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthContext.Provider value={{ authenticatedAccount }}>
          <StatusBar style="auto" />
          <StackLayout>
            <Stack.Protected guard={!!session && !!authenticatedAccount?.setup}>
              <Stack.Screen
                name="(pages)"
                options={{
                  headerShown: false,
                  animation: "none",
                }}
              />
            </Stack.Protected>
            <Stack.Protected guard={!!session && !authenticatedAccount?.setup}>
              <Stack.Screen
                name="setup"
                options={{
                  headerTitle: "Let's get to know you better",
                  animation: "none",
                }}
              />
            </Stack.Protected>
            <Stack.Protected guard={!session}>
              <Stack.Screen
                name="login"
                options={{
                  headerTitle: "Teammate",
                  animation: "none",
                }}
              />
            </Stack.Protected>
          </StackLayout>
        </AuthContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
