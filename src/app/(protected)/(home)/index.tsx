import PageView from "@/layouts/PageView";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Button, List, Surface, Text, useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();
  const colorScheme = Appearance.getColorScheme();
  const [listItems, setListItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/persons");
      const data = await response.json();
      setListItems(data);
    };

    fetchData();
  }, []);

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

      <List.Section>
        <List.Subheader>Items from GET</List.Subheader>
        {listItems.map((item) => (
          <List.Item key={item} title={item} />
        ))}
      </List.Section>
    </PageView>
  );
}
