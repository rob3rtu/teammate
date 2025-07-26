import { AuthContext } from "@/app/_layout";
import PageView from "@/layouts/PageView";
import { supabase } from "@/utils/supabase";
import { useContext } from "react";
import { Alert } from "react-native";
import { Button, Surface, Text } from "react-native-paper";

export default function HomeScreen() {
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
      <Text>
        Hello there, {authenticatedAccount?.firstName ?? "General Kenobi"}
      </Text>

      <Surface style={{ padding: 10 }}>
        <Text>Hello surface</Text>
      </Surface>

      <Button mode="outlined" onPress={handleResetSetup}>
        Reset setup
      </Button>
    </PageView>
  );
}
