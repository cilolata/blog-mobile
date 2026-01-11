import usePosts from "@/hooks/usePosts";
import { useAuthContext } from "@/context/AuthContext";
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

  const { posts, loading, page, hasMore, loadingMorePosts } = useGenericContext();

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
      <Text style={styles.title}>Minhas as aulas</Text>
      <Button
        icon={<Icon name="add-circle-outline" color="#ffffff" />}
        onPress={() => {
          navigation.navigate("FormPost", {
            userId: id,
          });
        }}
        buttonStyle={{
          backgroundColor: "#841584",
          borderRadius: 8,
          gap: 8,
          padding: 4,
        }}
        title="Criar Aula"
      />
      <FlatList
        data={posts.filter((item) => +item.user_id === id)}
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
            <Button
              icon={<Icon name="add-circle-outline" color="#ffffff" />}
              onPress={() => {
                navigation.navigate("SinglePost", {
                  item,
                  userId: id,
                });
              }}
              buttonStyle={{
                backgroundColor: "#841584",
                borderRadius: 8,
                gap: 8,
                padding: 4,
              }}
              title="Ver mais"
            />
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
});
