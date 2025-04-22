import TabsLayout from "@/layouts/TabsLayout";
import { AuthContext } from "@/utils/authContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";
import "react-native-reanimated";

export default function ProtectedLayout() {
  const { isLoggedIn, isReady } = useContext(AuthContext);

  if (!isReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
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
