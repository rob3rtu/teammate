import { Session } from "@supabase/supabase-js";
import { SplashScreen } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { UserProfile } from "@/types/auth";

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  isReady: boolean;
  session: Session | null;
  authenticatedAccount: UserProfile | null;
}

export const AuthContext = createContext<AuthContextType>({
  isReady: false,
  session: null,
  authenticatedAccount: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [authenticatedAccount, setAuthenticatedAccount] =
    useState<UserProfile | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            setAuthenticatedAccount(data);
          });
      }
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider value={{ session, isReady, authenticatedAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
