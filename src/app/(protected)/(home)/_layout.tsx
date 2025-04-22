import StackLayout from "@/layouts/StackLayout";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <StackLayout>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="third" options={{ title: "Third" }} />
    </StackLayout>
  );
}
