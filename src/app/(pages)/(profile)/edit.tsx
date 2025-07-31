import { AuthContext } from "@/app/_layout";
import LevelChip from "@/components/LevelChip";
import PageView from "@/layouts/PageView";
import { PlayerLevelEnum } from "@/types/auth";
import { profileSchema, ProfileSchemaType } from "@/types/profile";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Pressable, View } from "react-native";
import {
  Avatar,
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

export default function EditProfile() {
  const { authenticatedAccount, setAuthenticatedAccount } =
    useContext(AuthContext);
  const theme = useTheme();
  const router = useRouter();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: authenticatedAccount?.firstName,
      lastName: authenticatedAccount?.lastName,
      level: authenticatedAccount?.level,
      avatarUrl: authenticatedAccount?.avatarUrl ?? "",
    },
  });
  const selectedLevel = watch("level");
  const avatarUrl = watch("avatarUrl");

  const handleSaveChanges = useMutation({
    mutationFn: async (formData: ProfileSchemaType) => {
      const { error } = await supabase
        .from("profiles")
        .update(formData)
        .eq("id", authenticatedAccount?.id);

      if (error) throw error;

      return formData;
    },
    onSuccess: (formData: ProfileSchemaType) => {
      setAuthenticatedAccount({ ...authenticatedAccount!, ...formData });
      Toast.show({
        text1: "Profile updated successfully!",
      });
      router.back();
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.canceled) {
      const img = result.assets[0];
      const filePath = `${authenticatedAccount!.id}-${new Date()}.png`;
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const contentType = "image/png";
      await supabase.storage
        .from("avatars")
        .update(filePath, decode(base64), { contentType });

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      setValue("avatarUrl", publicUrlData.publicUrl);
    }
  };

  return (
    <PageView style={{ justifyContent: "space-between", paddingBottom: 24 }}>
      <View style={{ gap: 36, paddingTop: 24 }}>
        <View
          style={{ alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          <Pressable onPress={pickImage}>
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
          </Pressable>
          <Text
            style={{
              textDecorationLine: "underline",
              color: avatarUrl ? theme.colors.error : theme.colors.onBackground,
            }}
            onPress={() => {
              setValue("avatarUrl", "");
            }}
          >
            {avatarUrl ? "Delete image" : "Upload image"}
          </Text>
        </View>

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
            handleSaveChanges.mutateAsync(formData);
          },
          (errors) => {
            console.log(errors);
          }
        )}
        loading={handleSaveChanges.isPending}
      >
        Save
      </Button>
    </PageView>
  );
}
