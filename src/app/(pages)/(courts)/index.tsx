import PageView from "@/layouts/PageView";
import MapView from "react-native-maps";

export default function Courts() {
  return (
    <PageView style={{ padding: 0 }}>
      <MapView style={{ width: "100%", height: "100%" }} />
    </PageView>
  );
}
