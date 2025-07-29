import { LevelIndex, PlayerLevelEnum } from "@/types/auth";
import { capitalise } from "@/utils/utilityFunctions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Chip, Text } from "react-native-paper";

interface LevelChipProps {
  level: PlayerLevelEnum;
  isSelected: boolean;
  onPress?: () => void;
}

export default function LevelChip(props: LevelChipProps) {
  const { level, isSelected, onPress } = props;

  return (
    <Chip
      key={level}
      style={{ width: "31%" }}
      onPress={onPress}
      mode={isSelected ? "flat" : "outlined"}
    >
      <View
        style={{
          gap: 4,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ maxWidth: "100%", overflow: "hidden" }}
        >
          {capitalise(level)}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {Array.from(Array(LevelIndex[level]).keys()).map((i) => (
            <MaterialCommunityIcons key={i} name="tennis-ball" color="green" />
          ))}
        </View>
      </View>
    </Chip>
  );
}
