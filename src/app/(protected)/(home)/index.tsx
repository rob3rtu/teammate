import PageView from "@/layouts/PageView";
import { AuthContext } from "@/utils/authContext";
import { Link } from "expo-router";
import { useContext } from "react";
import { Button, Surface, Text, useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();
  const { authenticatedAccount } = useContext(AuthContext);

  return (
    <PageView style={{ alignItems: "flex-start" }}>
      <Text>Hello there, {authenticatedAccount?.fullName}</Text>

      <Link href="/(protected)/(home)/third" push asChild>
        <Button
          icon="ghost"
          mode="contained"
          buttonColor={theme.colors.tertiary}
        >
          Go to third
        </Button>
      </Link>

      <Surface style={{ padding: 10 }}>
        <Text>Hello surface</Text>
      </Surface>
    </PageView>
  );
}
