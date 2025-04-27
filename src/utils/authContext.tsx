import { Session } from "@supabase/supabase-js";
import { SplashScreen } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "./supabase";

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  isReady: boolean;
  session: Session | null;
  // setSession: React.Dispatch<React.SetStateAction<Session | null>>
}

export const AuthContext = createContext<AuthContextType>({
  isReady: false,
  session: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider value={{ session, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}
