import { AuthContext } from "@/app/_layout";
import LevelChip from "@/components/LevelChip";
import PageView from "@/layouts/PageView";
import { capitalise } from "@/utils/utilityFunctions";
import { Link, useNavigation } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, View } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";

export default function Profile() {
  const { authenticatedAccount } = useContext(AuthContext);
  const navigation = useNavigation();

  if (!authenticatedAccount) {
    return (
      <PageView>
        <Text>Oops, something went wrong.</Text>
      </PageView>
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link href="/(pages)/(profile)/edit" push asChild>
          <Text>Edit</Text>
        </Link>
      ),
    });
  }, []);

  return (
    <PageView style={{ gap: 24, alignItems: "center" }}>
      <View style={{ alignItems: "center", justifyContent: "center", gap: 8 }}>
        {authenticatedAccount.avatarUrl ? (
          <Avatar.Image
            style={{
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
            size={100}
            source={() => (
              <Image
                source={{ uri: authenticatedAccount.avatarUrl ?? "" }}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            )}
          />
        ) : (
          <Avatar.Text
            label={`${authenticatedAccount.firstName[0]}${authenticatedAccount.lastName[0]}`.toUpperCase()}
            size={100}
          />
        )}
        <Text style={{ fontSize: 20, fontWeight: 500 }}>
          {`${capitalise(authenticatedAccount.firstName)} ${capitalise(
            authenticatedAccount.lastName
          )}`}
        </Text>
      </View>

      <LevelChip level={authenticatedAccount.level} isSelected={true} />
    </PageView>
  );
}
