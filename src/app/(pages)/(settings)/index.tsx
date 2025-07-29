import { AuthContext } from "@/app/_layout";
import PageView from "@/layouts/PageView";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Alert } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export default function SettingsPage() {
  const theme = useTheme();
  const { authenticatedAccount } = useContext(AuthContext);

  const logOutMutation = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    },
    onError: (error) => Alert.alert(error.message),
  });

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
    <PageView style={{ gap: 16, alignItems: "center", width: "100%" }}>
      <Text>Hello settings page</Text>

      <Button
        style={{ width: "100%" }}
        mode="outlined"
        onPress={handleResetSetup}
      >
        Reset setup
      </Button>

      <Button
        style={{ width: "100%" }}
        mode="contained"
        onPress={() => logOutMutation.mutateAsync()}
        loading={logOutMutation.isPending}
        buttonColor={theme.colors.error}
        textColor={theme.colors.onError}
      >
        Log out
      </Button>
    </PageView>
  );
}
