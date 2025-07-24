import PageView from "@/layouts/PageView";
import { PlayerLevelEnum } from "@/types/auth";
import { AuthContext } from "@/utils/authContext";
import { supabase } from "@/utils/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import {
  Button,
  HelperText,
  Surface,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { z } from "zod";

const setupSchema = z.object({
  firstName: z.string().min(3, "First name must have at least 3 characters"),
  lastName: z.string().min(3, "First name must have at least 3 characters"),
  level: z.nativeEnum(PlayerLevelEnum),
  avatarUrl: z.string(),
});

type SetupSchemaType = z.infer<typeof setupSchema>;

export default function Setup() {
  const { authenticatedAccount } = useContext(AuthContext);
  const theme = useTheme();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SetupSchemaType>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      level: PlayerLevelEnum.Beginner,
      avatarUrl: "",
    },
  });
  const selectedLevel = watch("level");

  const handleFinishSetup = useMutation({
    mutationFn: async () => {
      await supabase
        .from("profiles")
        .update({ setup: true })
        .eq("id", authenticatedAccount?.id);
    },
    onSuccess: () => {
      supabase.auth.refreshSession();
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  return (
    <PageView style={{ justifyContent: "space-between" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCapitalize="none"
                label="First Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.firstName}
                theme={{ roundness: 12 }}
              />
            )}
          />
          <HelperText type="error" visible={!!errors.firstName}>
            {errors.firstName?.message}
          </HelperText>
        </View>
        <View style={{ width: "100%" }}>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCapitalize="none"
                label="Last Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.lastName}
                theme={{ roundness: 12 }}
              />
            )}
          />
          <HelperText type="error" visible={!!errors.lastName}>
            {errors.lastName?.message}
          </HelperText>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={{ textAlign: "left", fontSize: 18, fontWeight: 500 }}>
          Level
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {Object.keys(PlayerLevelEnum).map((level, index) => (
            <TouchableRipple
              key={level}
              style={{ width: "30%" }}
              onPress={() => {
                setValue(
                  "level",
                  PlayerLevelEnum[level as keyof typeof PlayerLevelEnum]
                );
              }}
            >
              <Surface
                elevation={
                  PlayerLevelEnum[level as keyof typeof PlayerLevelEnum] ===
                  selectedLevel
                    ? 5
                    : 0
                }
                style={{
                  padding: 8,
                  borderRadius: 6,
                  gap: 6,
                  alignItems: "center",
                }}
              >
                <Text>{level}</Text>
                <View style={{ flexDirection: "row" }}>
                  {Array.from(Array(index + 1).keys()).map((i) => (
                    <MaterialCommunityIcons
                      key={i}
                      name="tennis-ball"
                      color="green"
                    />
                  ))}
                </View>
              </Surface>
            </TouchableRipple>
          ))}
        </View>
      </View>

      <Button
        mode="contained"
        onPress={() => handleFinishSetup.mutateAsync()}
        loading={handleFinishSetup.isPending}
      >
        Let's play
      </Button>
    </PageView>
  );
}
