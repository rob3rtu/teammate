import { ThemeProvider } from "@/theme/ThemeProvider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Tabs screenOptions={{ tabBarActiveTintColor: "red" }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Fireplace",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="fire" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="second"
          options={{
            title: "Airplane",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="plane-up" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
