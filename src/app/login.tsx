import PageView from "@/layouts/PageView";
import { AuthContext } from "@/utils/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import {
  Button,
  HelperText,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
type LoginShemaType = z.infer<typeof loginSchema>;

export default function Login() {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(true);

  const authContext = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginShemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <PageView style={{ padding: 20, paddingTop: 100 }}>
      <Surface mode="flat" style={{ padding: 20, gap: 40 }}>
        <Text variant="headlineLarge" style={{ textAlign: "center" }}>
          Tennis, Together
        </Text>

        <View>
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
                  right={
                    <TextInput.Icon
                      icon={isPasswordHidden ? "eye" : "eye-off"}
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
          <Button onPress={onSubmit} mode="contained">
            {isCreatingAccount ? "Create account" : "Log in"}
          </Button>

          <Button
            mode="text"
            labelStyle={{ textDecorationLine: "underline" }}
            onPress={() => {
              setIsCreatingAccount(!isCreatingAccount);
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
