import PageView from "@/layouts/PageView";
import { AuthContext } from "@/utils/authContext";
import { supabase } from "@/utils/supabase";
import { Link } from "expo-router";
import { useContext } from "react";
import { Alert } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();
  const { authenticatedAccount } = useContext(AuthContext);

  const handleResetSetup = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ setup: false })
      .eq("id", authenticatedAccount?.id);

    if (error) {
      Alert.alert(error.message);
    }
    supabase.auth.refreshSession();
  };

  return (
    <PageView style={{ alignItems: "flex-start" }}>
      <Text>Hello there, {authenticatedAccount?.id ?? "General Kenobi"}</Text>

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

      <Button mode="outlined" onPress={handleResetSetup}>
        Reset setup
      </Button>
    </PageView>
  );
}
