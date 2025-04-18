import { Pressable, Text, View } from "dripsy";
import { Button, Switch } from "react-native";

export default function HomeScreen() {
  return (
    <View
      sx={{
        backgroundColor: "primary",
        flex: 1,
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text>Hello there</Text>

      <Pressable>
        <Text>Button</Text>
      </Pressable>

      <Switch></Switch>
    </View>
  );
}
