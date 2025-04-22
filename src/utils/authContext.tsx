import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

interface AuthState {
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: () => void;
  logOut: () => void;
}

const authStorageKey = "auth-key";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const updateAuthState = async (newState: { isLoggedIn: boolean }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (error) {
      console.error("Error saving AUTH state", error);
    }
  };

  const logIn = () => {
    setIsLoggedIn(true);
    updateAuthState({ isLoggedIn: true });
    router.replace("/");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    updateAuthState({ isLoggedIn: false });
    router.replace("/login");
  };

  useEffect(() => {
    const getAuthFromStorage = async () => {
      await new Promise((res) => setTimeout(() => res(null), 2000));
      try {
        const value = await AsyncStorage.getItem(authStorageKey);
        if (value !== null) {
          const authState = JSON.parse(value);
          setIsLoggedIn(authState.isLoggedIn);
        }
      } catch (error) {
        console.error("Error getting AUTH state", error);
      }
      setIsReady(true);
    };

    getAuthFromStorage();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}
