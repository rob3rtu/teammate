import PageView from "@/layouts/PageView";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import {
  Button,
  HelperText,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { z } from "zod";

const loginSchema = z
  .object({
    fullName: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    isCreatingAccount: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.isCreatingAccount && (data.fullName?.length ?? 0) < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Full Name must be at least 3 characters",
        path: ["fullName"],
      });
    }
  });

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      isCreatingAccount: false,
    },
  });

  const isCreatingAccount = watch("isCreatingAccount");

  const onSubmit = handleSubmit(
    async (data) => {
      setIsLoading(true);
      if (isCreatingAccount) {
        //signn up

        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              fullName: data.fullName,
            },
          },
        });

        if (error) Alert.alert(error.message);
      } else {
        //sign in

        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) Alert.alert(error.message);
      }

      setIsLoading(false);
    },
    (errors) => console.log(errors)
  );

  return (
    <PageView style={{ padding: 20, paddingTop: 100 }}>
      <Surface mode="flat" style={{ padding: 20, gap: 40 }}>
        <Text variant="headlineLarge" style={{ textAlign: "center" }}>
          Tennis, Together
        </Text>

        <View>
          {isCreatingAccount && (
            <View>
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    autoCapitalize="none"
                    label="Full Name"
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={!!errors.fullName}
                    theme={{ roundness: 12 }}
                  />
                )}
              />
              <HelperText type="error" visible={!!errors.fullName}>
                {errors.fullName?.message}
              </HelperText>
            </View>
          )}

          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  label="Email"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.email}
                  theme={{ roundness: 12 }}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
          </View>

          <View>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  label="Password"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.password}
                  secureTextEntry={isPasswordHidden}
                  theme={{ roundness: 12 }}
                  right={
                    <TextInput.Icon
                      icon={isPasswordHidden ? "eye-off" : "eye"}
                      onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                    />
                  }
                />
              )}
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password?.message}
            </HelperText>
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Button onPress={onSubmit} mode="contained" loading={isLoading}>
            {isCreatingAccount ? "Create account" : "Log in"}
          </Button>

          <Button
            mode="text"
            labelStyle={{ textDecorationLine: "underline" }}
            onPress={() => {
              setValue("isCreatingAccount", !isCreatingAccount);
            }}
          >
            {isCreatingAccount
              ? "Already have an account? Log in"
              : "Don't have an account? Create one"}
          </Button>
        </View>
      </Surface>
    </PageView>
  );
}
