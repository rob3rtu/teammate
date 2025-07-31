import PageView from "@/layouts/PageView";
import { PlayerLevelEnum } from "@/types/auth";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Pressable, View } from "react-native";
import {
  Avatar,
  Button,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import { AuthContext } from "./_layout";
import * as ImagePicker from "expo-image-picker";
import { profileSchema, ProfileSchemaType } from "@/types/profile";
import LevelChip from "@/components/LevelChip";
import { uploadAvatar } from "@/utils/utilityFunctions";

export default function Setup() {
  const { authenticatedAccount } = useContext(AuthContext);
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
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
    mutationFn: async (formData: ProfileSchemaType) => {
      console.log(formData);

      const { error } = await supabase
        .from("profiles")
        .update({ ...formData, setup: true })
        .eq("id", authenticatedAccount?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      supabase.auth.refreshSession();
    },
    onError: (error) => {
      console.error(error);
      Alert.alert(error.message);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/${result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf(".") + 1
      )};base64,${result.assets[0].base64 ?? ""}`;

      const filename = `${
        authenticatedAccount?.id
      }.${result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf(".") + 1
      )}`;
      const publicUrl = await uploadAvatar(base64, filename);

      if (publicUrl) {
        setValue("avatarUrl", publicUrl);
      }
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
            {(
              Object.keys(PlayerLevelEnum) as (keyof typeof PlayerLevelEnum)[]
            ).map((level) => (
              <LevelChip
                key={level}
                level={PlayerLevelEnum[level]}
                isSelected={selectedLevel === PlayerLevelEnum[level]}
                onPress={() => {
                  setValue("level", PlayerLevelEnum[level]);
                }}
              />
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
