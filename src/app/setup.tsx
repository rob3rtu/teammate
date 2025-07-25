import PageView from "@/layouts/PageView";
import { PlayerLevelEnum } from "@/types/auth";
import { supabase } from "@/utils/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Pressable, View } from "react-native";
import {
  Avatar,
  Button,
  HelperText,
  Surface,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import { z } from "zod";
import { AuthContext } from "./_layout";
import * as ImagePicker from "expo-image-picker";

const setupSchema = z.object({
  firstName: z.string().min(3, "First name must have at least 3 characters"),
  lastName: z.string().min(3, "First name must have at least 3 characters"),
  level: z.nativeEnum(PlayerLevelEnum),
  avatarUrl: z.string(),
});

type SetupSchemaType = z.infer<typeof setupSchema>;

export default function Setup() {
  const { authenticatedAccount } = useContext(AuthContext);
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
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
  const avatarUrl = watch("avatarUrl");

  const handleFinishSetup = useMutation({
    mutationFn: async (formData: SetupSchemaType) => {
      await supabase
        .from("profiles")
        .update({ ...formData, setup: true })
        .eq("id", authenticatedAccount?.id);
    },
    onSuccess: () => {
      supabase.auth.refreshSession();
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValue("avatarUrl", result.assets[0].uri);
    }
  };

  return (
    <PageView style={{ justifyContent: "space-between" }}>
      <View style={{ gap: 36, paddingTop: 24 }}>
        <Pressable
          style={{ alignItems: "center", justifyContent: "center", gap: 8 }}
          onPress={pickImage}
        >
          {avatarUrl ? (
            <Avatar.Image
              style={{
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
              size={100}
              source={() => (
                <Image
                  source={{ uri: avatarUrl }}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              )}
            />
          ) : (
            <Avatar.Icon icon="plus" size={100} />
          )}
          <Text
            style={{
              textDecorationLine: "underline",
            }}
          >
            Profile picture
          </Text>
        </Pressable>

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
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(
          (formData) => {
            handleFinishSetup.mutateAsync(formData);
          },
          (errors) => {
            console.log(errors);
          }
        )}
        loading={handleFinishSetup.isPending}
      >
        Let's play
      </Button>
    </PageView>
  );
}
