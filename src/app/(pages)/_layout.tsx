import TabsLayout from "@/layouts/TabsLayout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import "react-native-reanimated";

export default function ProtectedLayout() {
  return (
    <TabsLayout>
      <Tabs.Screen
        name="(timeline)/index"
        options={{
          title: "Timeline",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tennis" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(courts)/index"
        options={{
          title: "Courts",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-search-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </TabsLayout>
  );
}
