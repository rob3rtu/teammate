import PageView from "@/layouts/PageView";
import { PlayerLevelEnum } from "@/types/auth";
import { AuthContext } from "@/utils/authContext";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
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
  const {
    control,
    formState: { errors },
  } = useForm<SetupSchemaType>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      level: PlayerLevelEnum.Beginner,
      avatarUrl: "",
    },
  });

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
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Let's get to know you better
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
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
        <View style={{ flex: 1 }}>
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

      <Button
        mode="contained"
        onPress={() => handleFinishSetup.mutateAsync()}
        loading={handleFinishSetup.isPending}
      >
        Finish
      </Button>
    </PageView>
  );
}
