import { Text, TextInput, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGenericContext } from "@/context/GenericContext";
import Toast from "react-native-toast-message";

import { RouteProp } from '@react-navigation/native';

export function FormPost({ route }: { route: RouteProp<any, any> }) {
  const navigation = useNavigation<NavigationProp<any>>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);

  const { editPost, createPost } = useGenericContext();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
    content: string;
    subject: string;
  }>({
    defaultValues: route?.params?.post,
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await editPost(data);
      setIsLoading(false);
      Toast.show({
        type: "success",
        text1: "Post editado com sucesso!",
        visibilityTime: 4000,
        position: "bottom",
      });
      navigation.navigate("SinglePost", {
        item: data,
        origin: "FormPost",
      });
      reset();
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao editar o post.",
        position: "bottom",
        visibilityTime: 4000,
      });
      setIsLoading(false);
    }
  };

  const onSubmitCreate = async (data: any) => {
    setIsLoadingCreate(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;
      await createPost({ user_id: +userId, ...data });
      Toast.show({
        type: "success",
        text1: "Post criado com sucesso!",
        visibilityTime: 4000,
      });
      navigation.goBack();
      reset();
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao criar post.",
        visibilityTime: 4000,
      });
      setIsLoadingCreate(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container} accessible={true}>
        <Text style={styles.title}>
          {route.params?.post?.id ? "Editar Post" : "Criar Post"}
        </Text>
        <View style={styles.viewInput}>
          <Text nativeID="formLabel-title">Título</Text>
          <Controller
            name="title"
            rules={{
              required: !route.params?.post?.id
                ? "Título é obrigatório"
                : false,
            }}
            control={control}
            render={({ field }) => (
              <>
                <TextInput
                  {...field}
                  multiline={true}
                  accessibilityLabel="input-title"
                  accessibilityLabelledBy="formLabel-title"
                  style={styles.input}
                  onChangeText={field.onChange}
                />
                {errors?.title && (
                  <Text style={{ color: "red" }}>{errors?.title?.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <View style={styles.viewInput}>
          <Text nativeID="formLabel-subject">Matéria</Text>
          <Controller
            name="subject"
            rules={{
              required: !route.params?.post?.id
                ? "Matéria é obrigatório"
                : false,
            }}
            control={control}
            render={({ field }) => (
              <>
                <TextInput
                  {...field}
                  multiline={true}
                  accessibilityLabel="input-subject"
                  accessibilityLabelledBy="formLabel-subject"
                  style={styles.input}
                  onChangeText={field.onChange}
                />
                {errors?.subject && (
                  <Text style={{ color: "red" }}>{errors?.subject?.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <View style={styles.viewInput}>
          <Text nativeID="formLabel-description">Descrição</Text>
          <Controller
            name="description"
            rules={{
              required: !route.params?.post?.id
                ? "Descriçao é obrigatório"
                : false,
            }}
            control={control}
            render={({ field }) => (
              <>
              <TextInput
                {...field}
                multiline={true}
                accessibilityLabel="input-description"
                accessibilityLabelledBy="formLabel-description"
                style={styles.input}
                onChangeText={field.onChange}
              />
              {errors?.description && (
                <Text style={{ color: "red" }}>{errors?.description?.message}</Text>
              )}
            </>
            )}
          />
        </View>
        <View style={styles.viewInput}>
          <Text nativeID="formLabel-content">Conteúdo</Text>
          <Controller
            name="content"
            rules={{
              required: !route.params?.post?.id
                ? "Conteúdo é obrigatório"
                : false,
            }}
            control={control}
            render={({ field }) => (
              <>
              <TextInput
                {...field}
                multiline={true}
                accessibilityLabel="input-content"
                accessibilityLabelledBy="formLabel-content"
                style={styles.input}
                onChangeText={field.onChange}
              />
              {errors?.content && (
                <Text style={{ color: "red" }}>{errors?.content?.message}</Text>
              )}
            </>
            )}
          />
        </View>
        {route.params?.post?.id ? (
          <Button
            onPress={handleSubmit(onSubmit)}
            title={isLoading ? "Carregando..." : "Editar"}
            buttonStyle={{
              backgroundColor: "#841584",
              borderRadius: 8,
              gap: 8,
              padding: 8,
            }}
          />
        ) : (
          <Button
            onPress={handleSubmit(onSubmitCreate)}
            title={isLoadingCreate ? "Carregando..." : "Enviar"}
            buttonStyle={{
              backgroundColor: "#841584",
              borderRadius: 8,
              gap: 8,
              padding: 8,
            }}
          />
        )}
      </SafeAreaView>
    </>
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
  viewInput: {
    flexDirection: "column",
    gap: 8,
  },
  input: {
    borderColor: "#333333",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
  },
});
