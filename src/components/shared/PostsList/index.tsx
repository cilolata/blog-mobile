import { useGenericContext } from "@/context/GenericContext";
import usePosts from "@/hooks/usePosts";
import {
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Icon, Button, Card, Input } from "react-native-elements";

export function PostList() {
  const [refresh, setRefresh] = React.useState<any>();
  const navigation = useNavigation<NavigationProp<any>>();
  const {
    posts,
    loading,
    page,
    hasMore,
    loadingMorePosts,
    updateSearch,
    value,
  } = useGenericContext();

  const handleRelaod = useCallback(async () => {
    setRefresh(true)
    await loadingMorePosts(page);
    setRefresh(false)
  }, [])

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
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={handleRelaod} />
      }
        data={posts}
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
          loading && !refresh ? (
            <ActivityIndicator style={{ marginVertical: 32 }} size="large" />
          ) : null
        }
        renderItem={({ item, index }) => (
          <View key={`${item.id}-${item.title}-${index}`} style={styles.cards}>
            <Card.Title>{item.title?.toUpperCase()}</Card.Title>
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
