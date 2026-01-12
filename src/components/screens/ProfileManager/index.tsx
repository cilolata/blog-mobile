import { useAuthContext } from "@/context/AuthContext";
import { GenericProvider, useGenericContext } from "@/context/GenericContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Icon, Button, Card, Switch } from "react-native-elements";

export function ProfileManager() {
  const [refresh, setRefresh] = React.useState<any>();
  const [isTeachersProfiles, setIsTeachersProfiles] = React.useState<number>(1);
  const navigation = useNavigation<NavigationProp<any>>();
  const {
    profiles,
    loadingProfiles,
    pageListProfiles,
    hasMoreProfiles,
    loadingMoreProfiles,
    deleteUser,
  } = useGenericContext();

  const { user, clearSession } = useAuthContext();

  const handleDelete = async (id?: string | number) => {
    await deleteUser(id);

    if (user?.id === id) {
      clearSession();
      navigation.navigate("Login");
    }
  };

  const handleRelaod = useCallback(async () => {
    setRefresh(true);
    await loadingMoreProfiles(1);
    setRefresh(false);
  }, []);

  console.log(profiles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos os usuários</Text>
      <View style={{ flexDirection: "row", marginVertical: 16, gap: 4 }}>
        <Button
          type="clear"
          title={"Alunos"}
          onPress={() => setIsTeachersProfiles(1)}
        />
        <Button
          type="clear"
          title={"Porfessores"}
          onPress={() => setIsTeachersProfiles(0)}
        />
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRelaod} />
        }
        data={profiles.filter((p: any) => p.permission_type === isTeachersProfiles)}
        numColumns={1}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        keyExtractor={(item, index) =>
          item?.id ? `${item.id}-${item.username}-${index}` : ""
        }
        onEndReachedThreshold={0.5}
        onEndReached={async () => {
          if (hasMoreProfiles) {
            await loadingMoreProfiles(pageListProfiles);
          }
        }}
        ListFooterComponent={
          loadingProfiles && !refresh ? (
            <ActivityIndicator style={{ marginVertical: 32 }} size="large" />
          ) : null
        }
        renderItem={({ item, index }) => (
          <View
            key={`${item.id}-${item.username}-${index}`}
            style={styles.cards}
          >
            <View>
              <Text style={{ fontWeight: "bold" }}>
                Nome: {item.username ?? "Não informado"}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                E-mail: {item.email ?? "Não informada"}
              </Text>
            </View>
            <Card.Divider />
            <View style={styles.containerButtons}>
              <Button
                type="clear"
                icon={<Icon name="edit" color={"#151212"} />}
                onPress={() => {
                  navigation.navigate("EditProfile", {
                    user: item,
                  });
                }}
                buttonStyle={{
                  borderRadius: 8,
                  gap: 8,
                  padding: 4,
                }}
                titleStyle={{ color: "#151212" }}
                title="Editar Perfil"
              />
              <Button
                type="clear"
                icon={<Icon name="delete" color="#841515" />}
                onPress={() => {
                  handleDelete(item.id);
                }}
                titleStyle={{ color: "#841515" }}
                buttonStyle={{
                  borderRadius: 8,
                  gap: 8,
                  padding: 4,
                }}
                title="Deletar Perfil"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    gap: 16,
    padding: 16,
    backgroundColor: "#e6e6e6",
  },
  cards: {
    gap: 8,
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
    flexDirection: "column",
    borderRadius: 4,
    padding: 16,
    backgroundColor: "#fff",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
