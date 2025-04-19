import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

interface PageViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function PageView(props: PageViewProps) {
  const theme = useTheme();
  const { children, style } = props;

  return (
    <View
      style={{
        gap: 10,
        padding: 12,
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.colors.background,
        ...(StyleSheet.flatten(style) || {}),
      }}
    >
      {children}
    </View>
  );
}
