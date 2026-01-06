import { Text, TextInput, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "@/context/AuthContext";
import { HTTPResponseStatus } from "@/interfaces";
import { getLogin, getRegister } from "@/services";
import { Controller, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

export function Login() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [permissionTypeValue, setPermissionTypeValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [erroMessage, setErrorMessage] = useState<string>("");

  const { handleWriteSession } = useAuthContext();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      permissionType: 0,
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const response = !isRegister
        ? await getLogin(data)
        : await getRegister(data);

      if (response.status === HTTPResponseStatus.CREATED) {
        setIsRegister(false);
      }

      if (response.status === HTTPResponseStatus.OK) {
        navigation.navigate("Home");
        setIsLoading(false);
        handleWriteSession(response.data);
        setErrorMessage("");
      }

      if (response.status === HTTPResponseStatus.NOT_FOUND) {
        setErrorMessage(response?.data?.message);
        throw Error();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container} accessible={true}>
        <Text style={styles.title}>{isRegister ? "Cadastrar" : "Entrar"}</Text>
        <View style={styles.viewInput}>
          <Text nativeID="formLabel-username">E-mail</Text>
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
        {isRegister && (
          <View style={styles.viewInput}>
            <Controller
              name="permissionType"
              rules={{
                required: "Selecione um tipo de permissão",
              }}
              control={control}
              render={({ field }) => (
                <Picker
                  {...field}
                  accessibilityLabel="select-permissionType"
                  accessibilityLabelledBy="formLabel-permissionType"
                  selectedValue={field.value}
                  style={styles.input}
                  onValueChange={(itemValue) => {
                    field.onChange(itemValue);
                    setValue("permissionType", itemValue);
                  }}
                >
                  <Picker.Item label="Aluno" value={0} />
                  <Picker.Item label="Professor" value={1} />
                </Picker>
              )}
            />
          </View>
        )}
        <Button
          onPress={handleSubmit(onSubmit)}
          title={
            isLoading
              ? "Carregando..."
              : isRegister && !isLoading
                ? "Enviar"
                : "Entrar"
          }
          buttonStyle={{
            backgroundColor: "#841584",
            borderRadius: 8,
            gap: 8,
            padding: 8,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            color: "#333333",
            textAlign: "center",
          }}
        >
          Não possue uma conta?{" "}
          <Text onPress={() => setIsRegister(true)}>Cadastre-se</Text>
        </Text>
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
    height: 40,
    borderColor: "#333333",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
  },
});
