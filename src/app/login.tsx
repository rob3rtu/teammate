import PageView from "@/layouts/PageView";
import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";

import { Button, Text } from "react-native-paper";

export default function Login() {
  const authContext = useContext(AuthContext);

  return (
    <PageView>
      <Text>Login screen</Text>
      <Button onPress={authContext.logIn} mode="contained">
        Log in
      </Button>
    </PageView>
  );
}
