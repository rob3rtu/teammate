import { ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
                paddingBottom: 0,
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
    </SafeAreaView>
  );
}
