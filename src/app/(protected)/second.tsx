import PageView from "@/layouts/PageView";
import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { Button, Text } from "react-native-paper";

export default function SecondScreen() {
  const authContext = useContext(AuthContext);

  return (
    <PageView>
      <Text>Second screen</Text>
      <Button mode="outlined" onPress={authContext.logOut}>
        Log out
      </Button>
    </PageView>
  );
}
