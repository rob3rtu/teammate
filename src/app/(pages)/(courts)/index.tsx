import PageView from "@/layouts/PageView";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function Courts() {
  return (
    <PageView style={{ padding: 0 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%" }}
      />
    </PageView>
  );
}
