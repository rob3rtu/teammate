import StackLayout from "@/layouts/StackLayout";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <StackLayout>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Profile" }} />
    </StackLayout>
  );
}
