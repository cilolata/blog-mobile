import React from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";

export function SinglePost({ route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params?.item?.title ?? ""}</Text>
      <ScrollView>
        <Text style={styles.content}>{route.params?.item?.content ?? ""}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    fontSize: 24,
    fontWeight: "bold",
    paddingInline: 16,
  },
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    gap: 16,
    padding: 16,
    backgroundColor: "#e6e6e6",
  },
  content: {
    borderRadius: 4,
    backgroundColor: "#fff",
    padding: 16,
    fontSize: 18,
    lineHeight: 24,
  },
});
