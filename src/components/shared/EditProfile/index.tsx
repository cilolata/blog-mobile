import { Text, TextInput, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, Form, useForm } from "react-hook-form";
import useProfiles from "@/hooks/useProfile";
import { HTTPResponseStatus } from "@/interfaces";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useGenericContext } from "@/context/GenericContext";

export function EditProfile({ route }) {
  const navigation = useNavigation<NavigationProp<any>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: route.params.user,
  });

  const {  
    editUser 
  } =
  useGenericContext();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const response = await editUser(data.id, data);
    setIsLoading(false);
    if(response?.status === HTTPResponseStatus.OK) {
      navigation.navigate('ProfilesScreen', { users: data.user });
    }
    try {
    } catch (error) {
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
              <TextInput
                {...field}
                accessibilityLabel="input-username"
                accessibilityLabelledBy="formLabel-username"
                style={styles.input}
                onChangeText={field.onChange}
              />
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
              <TextInput
                {...field}
                accessibilityLabel="input-email"
                accessibilityLabelledBy="formLabel-email"
                style={styles.input}
                onChangeText={field.onChange}
              />
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
              <TextInput
                {...field}
                accessibilityLabel="input-password"
                accessibilityLabelledBy="formLabel-password"
                style={styles.input}
                onChangeText={field.onChange}
              />
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
