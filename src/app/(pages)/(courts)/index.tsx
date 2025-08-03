import PageView from "@/layouts/PageView";
import { useState } from "react";
import MapView from "react-native-maps";
import { AnimatedFAB, FAB, useTheme } from "react-native-paper";

export default function Courts() {
  const theme = useTheme();
  const [isAddingNewCourt, setIsAddingNewCourt] = useState<boolean>(false);

  return (
    <PageView style={{ padding: 0 }}>
      <MapView style={{ width: "100%", height: "100%" }} />

      {isAddingNewCourt && (
        <AnimatedFAB
          icon="close"
          extended={false}
          label="Cancel"
          onPress={() => {
            setIsAddingNewCourt(false);
          }}
          color={theme.colors.onErrorContainer}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            margin: 16,
            backgroundColor: theme.colors.errorContainer,
          }}
        />
      )}

      <AnimatedFAB
        icon={isAddingNewCourt ? "map-marker-right-outline" : "plus"}
        variant="secondary"
        label="Continue"
        extended={isAddingNewCourt}
        onPress={() => {
          setIsAddingNewCourt(true);
        }}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          margin: 16,
        }}
      />
    </PageView>
  );
}
