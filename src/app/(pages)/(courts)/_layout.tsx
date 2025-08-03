import StackLayout from "@/layouts/StackLayout";
import { Stack } from "expo-router";

export default function CourtsLayout() {
  return (
    <StackLayout>
      <Stack.Screen name="index" options={{ title: "Courts" }} />
    </StackLayout>
  );
}
