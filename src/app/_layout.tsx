import StackLayout from "@/layouts/StackLayout";
import ThemeProvider from "@/theme/ThemeProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { UserProfile } from "@/types/auth";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, View, Image } from "react-native";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

interface AuthContextType {
  authenticatedAccount: UserProfile | null;
  setAuthenticatedAccount: (u: UserProfile | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  authenticatedAccount: null,
  setAuthenticatedAccount: () => {},
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
        setIsAppReady(false);
        setSession(session);
      });
    };

    loadResources();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsAppReady(false);
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setAuthenticatedAccount(data);
      } else {
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    fetchProfile();
  }, [session]);

  useEffect(() => {
    const setuser = async () => {
      if (authenticatedAccount) {
        setIsAppReady(true);
        SplashScreen.hideAsync();
      }
    };

    setuser();
  }, [authenticatedAccount]);

  if (!isAppReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={{ width: 100, height: 100 }}
        />
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthContext.Provider
          value={{ authenticatedAccount, setAuthenticatedAccount }}
        >
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
          <Toast />
        </AuthContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
