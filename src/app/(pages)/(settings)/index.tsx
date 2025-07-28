import PageView from "@/layouts/PageView";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export default function SettingsPage() {
  const theme = useTheme();
  const logOutMutation = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    },
    onError: (error) => Alert.alert(error.message),
  });

  return (
    <PageView style={{ gap: 24 }}>
      <Text>Hello settings page</Text>

      <Button
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
