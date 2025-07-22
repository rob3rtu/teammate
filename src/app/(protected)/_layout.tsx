import StackLayout from "@/layouts/StackLayout";
import TabsLayout from "@/layouts/TabsLayout";
import { AuthContext } from "@/utils/authContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Stack, Tabs } from "expo-router";
import { useContext } from "react";
import "react-native-reanimated";

export default function ProtectedLayout() {
  const { session, isReady, authenticatedAccount } = useContext(AuthContext);

  if (!isReady) {
    return null;
  }

  if (!session || !session.user) {
    return <Redirect href="/login" />;
  }

  if (!authenticatedAccount?.setup) {
    return (
      <StackLayout>
        <Stack.Screen
          name="setup"
          options={{
            headerTitle: "Profile Setup",
          }}
        />
      </StackLayout>
    );
  }

  return (
    <TabsLayout>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="second"
        options={{
          title: "Airplane",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="airplane" size={size} color={color} />
          ),
        }}
      />
    </TabsLayout>
  );
}
