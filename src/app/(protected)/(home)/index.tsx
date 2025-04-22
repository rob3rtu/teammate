import PageView from "@/layouts/PageView";
import { Link } from "expo-router";
import { Appearance } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();

  const colorScheme = Appearance.getColorScheme();

  return (
    <PageView style={{ alignItems: "flex-start" }}>
      <Text>Hello there</Text>

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

      <Text>Color Scheme: {colorScheme}</Text>
    </PageView>
  );
}
