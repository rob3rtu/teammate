import { AuthContext } from "@/app/_layout";
import PageView from "@/layouts/PageView";
import { useContext } from "react";
import { Surface, Text } from "react-native-paper";

export default function HomeScreen() {
  const { authenticatedAccount } = useContext(AuthContext);

  return (
    <PageView style={{ alignItems: "flex-start" }}>
      <Text>
        Hello there, {authenticatedAccount?.firstName ?? "General Kenobi"}
      </Text>

      <Surface style={{ padding: 10 }}>
        <Text>Hello surface</Text>
      </Surface>
    </PageView>
  );
}
