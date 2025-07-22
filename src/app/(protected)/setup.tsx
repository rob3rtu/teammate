import PageView from "@/layouts/PageView";
import { AuthContext } from "@/utils/authContext";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Alert } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Setup() {
  const { authenticatedAccount } = useContext(AuthContext);

  const handleFinishSetup = useMutation({
    mutationFn: async () => {
      await supabase
        .from("profiles")
        .update({ setup: true })
        .eq("id", authenticatedAccount?.id);
    },
    onSuccess: () => {
      supabase.auth.refreshSession();
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  return (
    <PageView style={{ justifyContent: "space-between" }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Let's get to know you better
      </Text>

      <Button
        mode="contained"
        onPress={() => handleFinishSetup.mutateAsync()}
        loading={handleFinishSetup.isPending}
      >
        Finish
      </Button>
    </PageView>
  );
}
