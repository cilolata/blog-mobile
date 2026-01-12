import { RouteProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import { Button } from "react-native-elements";

export function SinglePost({
  route,
}: {
  route: RouteProp<any, any>
}) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {route?.params?.userId && (
        <Button
          onPress={() => {
            navigation.navigate("FormPost", {
              post: route?.params?.item,
              userId: route?.params?.userId,
            });
          }}
          buttonStyle={{
            cursor: "pointer",
            alignSelf: "flex-end",
            backgroundColor: "#841584",
            borderRadius: 8,
            gap: 8,
            padding: 6,
          }}
          title="Editar aula"
        />
      )}
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
