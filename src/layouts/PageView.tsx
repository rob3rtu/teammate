import { ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { useTheme } from "react-native-paper";

interface PageViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function PageView(props: PageViewProps) {
  const theme = useTheme();
  const { children, style } = props;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={[
            {
              flexGrow: 1,
              padding: 12,
              gap: 10,
              backgroundColor: theme.colors.background,
            },
            StyleSheet.flatten(style),
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
