import PageView from "@/layouts/PageView";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Profile() {
  const logOutMutation = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    },
    onError: (error) => Alert.alert(error.message),
  });

  return (
    <PageView>
      <Text>Profile page</Text>
      <Button
        mode="contained"
        onPress={() => logOutMutation.mutateAsync()}
        loading={logOutMutation.isPending}
      >
        Log out
      </Button>
    </PageView>
  );
}
