import { IPost } from "@/interfaces";
import { getAllPosts, searchPost } from "@/services";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Icon, Button, Card, Input } from "react-native-elements";

export function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [value, setValue] = React.useState<string | undefined>("");

  const navigation = useNavigation<any>();

  const loadingMore = async (value: number) => {
    setLoading(true);
    const { data, status, error } = await getAllPosts({ page: value });
    setPage((prev) => prev + 1);
    if (data.posts && status === 200) {
      setLoading(false);
      setPosts([...posts, ...data.posts]);
    }

    if (error || status !== 200 || data.posts.length === 0) {
      setLoading(false);
      setHasMore(false);
    }
  };

  useEffect(() => {
    const firstFetch = async () => {
      await loadingMore(page);
    };
    firstFetch();
  }, []);

  const updateSearch = async (search?: string) => {
    setValue(search);
    try {
      const response = await searchPost(search);
      setPosts(response.posts);
    } catch {
      console.error("Error updating search");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas as aulas</Text>
      <Input
        accessibilityLabel="Pesquisar"
        leftIcon={{ type: "material", name: "search" }}
        onChangeText={(text) => {
          updateSearch(text);
        }}
        placeholderTextColor="#000"
        placeholder="Pesquisar..."
        value={value}
      />
      <FlatList
        data={posts}
        numColumns={1}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        keyExtractor={(item) => (item?.id ? item?.id?.toString() : "")}
        onEndReachedThreshold={0.5}
        onEndReached={async () => {
          if (hasMore) {
            await loadingMore(page);
          }
        }}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator style={{ marginVertical: 32 }} size="large" />
          ) : null
        }
        renderItem={({ item }) => (
          <View key={item.id} style={styles.cards}>
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
});
