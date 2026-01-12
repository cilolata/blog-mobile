import { useNavigation } from "expo-router";
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGenericContext } from "@/context/GenericContext";

export function Dashboard() {
  const [id, setId] = useState<number | null>();
  const navigation = useNavigation<any>();

  const { posts, loading, page, hasMore, loadingMorePosts, deletePost } =
    useGenericContext();

  const handleDelete = async (id?: string | number) => {
    await deletePost(id);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await AsyncStorage.getItem("userId");
      await loadingMorePosts(1);

      if (userId) {
        setId(+userId);
      }
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        titleStyle={{ color: "#fff", fontWeight: "bold" }}
        buttonStyle={{
          cursor: "pointer",
          alignSelf: "flex-end",
          borderRadius: 8,
        }}
        onPress={() => {
          navigation.navigate("FormPost", {
            userId: id,
          });
        }}
        title="Criar nova Aula"
      />
      <Text style={styles.title}>Minhas as aulas</Text>
      {!posts?.find((item: any) => +item.user_id === id) && (
        <Text style={{ marginVertical: 16 }}>
          Sem aulas postadas no momento
        </Text>
      )}
      <FlatList
        data={posts.filter((item: any) => +item.user_id === id)}
        numColumns={1}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        keyExtractor={(item, index) =>
          item?.id ? `${item.id}-${item.title}-${index}` : ""
        }
        onEndReachedThreshold={0.5}
        onEndReached={async () => {
          if (hasMore) {
            await loadingMorePosts(page);
          }
        }}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator style={{ marginVertical: 32 }} size="large" />
          ) : null
        }
        renderItem={({ item, index }) => (
          <View key={`${item.id}-${item.title}-${index}`} style={styles.cards}>
            <Card.Title>{item.title.toUpperCase()}</Card.Title>
            <Text style={{ paddingVertical: 4 }}>{item.description}</Text>
            <View>
              <Text style={{ fontWeight: "bold" }}>
                Prof: {item.teacher ?? "Não informado"}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                Matéria: {item.subject ?? "Não informada"}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                Data da postagem:{" "}
                {item?.created_at
                  ? new Date(item.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "Sem data"}
              </Text>
            </View>
            <Card.Divider />
            <View style={styles.containerButtons}>
              <Button
                type="clear"
                icon={<Icon name="add-circle-outline" color="#151212" />}
                onPress={() => {
                  navigation.navigate("SinglePost", {
                    item,
                    userId: id,
                  });
                }}
                titleStyle={{ color: "#151212" }}
                buttonStyle={{
                  borderRadius: 8,
                  gap: 8,
                  padding: 4,
                }}
                title="Ver mais"
              />
              <Button
                type="clear"
                icon={<Icon name="delete" color="#841515" />}
                onPress={async () => await handleDelete(item.id)}
                titleStyle={{ color: "#841515" }}
                buttonStyle={{
                  borderRadius: 8,
                  gap: 8,
                  padding: 4,
                }}
                title="Deletar Post"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
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
