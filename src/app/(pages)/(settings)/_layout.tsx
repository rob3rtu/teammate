import StackLayout from "@/layouts/StackLayout";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <StackLayout>
      <Stack.Screen name="index" options={{ title: "Settings" }} />
    </StackLayout>
  );
}
