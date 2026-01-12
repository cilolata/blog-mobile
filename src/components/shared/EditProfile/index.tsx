import { Text, TextInput, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { HTTPResponseStatus } from "@/interfaces";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useGenericContext } from "@/context/GenericContext";
import Toast from "react-native-toast-message";

import { RouteProp } from '@react-navigation/native';

export function EditProfile({ route }: { route: RouteProp<any, any> }) {
  const navigation = useNavigation<NavigationProp<any>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    id: number;
    username: string;
    email: string;
    password: string;
  }>({
    defaultValues: {
      ...route?.params?.user,
    },
  });

  const { editUser } = useGenericContext();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const response = await editUser(data.id, data);
    setIsLoading(false);
    if (response?.status === HTTPResponseStatus.OK) {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Perfil atualizado com sucesso!",
      });
      navigation.goBack();
    }
    try {
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Erro ao atualizar o perfil.",
        visibilityTime: 4000,
      });
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container} accessible={true}>
      <Text style={styles.title}>{"Editar"}</Text>
      <View style={styles.viewInput}>
        <Text nativeID="formLabel-username">Nome</Text>
        <Controller
          name="username"
          rules={{
            required: "Preencha seu nome",
          }}
          control={control}
          render={({ field }) => (
            <>
              <TextInput
                {...field}
                accessibilityLabel="input-username"
                accessibilityLabelledBy="formLabel-username"
                style={styles.input}
                onChangeText={field.onChange}
              />
              {errors.username && (
                <Text style={{ color: "red" }}>{errors?.username.message}</Text>
              )}
            </>
          )}
        />
      </View>
      <View style={styles.viewInput}>
        <Text nativeID="formLabel-email">E-mail</Text>
        <Controller
          name="email"
          rules={{
            required: "Preencha seu email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "E-mail inválido",
            },
          }}
          control={control}
          render={({ field }) => (
            <>
              <TextInput
                {...field}
                accessibilityLabel="input-email"
                accessibilityLabelledBy="formLabel-email"
                style={styles.input}
                onChangeText={field.onChange}
              />
              {errors.email && (
                <Text style={{ color: "red" }}>{errors?.email.message}</Text>
              )}
            </>
          )}
        />
      </View>
      <View style={styles.viewInput}>
        <Text nativeID="formLabel-password">Senha</Text>
        <Controller
          name="password"
          rules={{
            required: "Preencha sua senha",
          }}
          control={control}
          render={({ field }) => (
            <>
              <View>
                <View>
                  <TextInput
                    {...field}
                    secureTextEntry={showPassword}
                    textContentType="password"
                    accessibilityLabel="input-password"
                    accessibilityLabelledBy="formLabel-password"
                    style={styles.input}
                    onChangeText={field.onChange}
                  />
                  <View style={{ alignItems: "flex-start", width: "100%" }}>
                    <Button
                      onPress={() => setShowPassword(!showPassword)}
                      icon={
                        showPassword
                          ? {
                              name: "eye-off",
                              type: "feather",
                              color: "#000000",
                            }
                          : { name: "eye", type: "feather", color: "#000000" }
                      }
                      type="clear"
                      title=""
                      titleStyle={{ color: "#000000", fontSize: 12 }}
                    />
                  </View>
                </View>
              </View>
              {errors.password && (
                <Text style={{ color: "red" }}>{errors?.password.message}</Text>
              )}
            </>
          )}
        />
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        title={isLoading ? "Carregando..." : "Enviar"}
        buttonStyle={{
          backgroundColor: "#841584",
          borderRadius: 8,
          gap: 8,
          padding: 8,
        }}
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
  viewInput: {
    flexDirection: "column",
    gap: 8,
  },
  input: {
    height: 40,
    borderColor: "#333333",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
  },
});
