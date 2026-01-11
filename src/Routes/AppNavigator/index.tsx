import { Login } from "@/components/screens/Login";
import { EditProfile } from "@/components/shared/EditProfile";
import { FormPost } from "@/components/shared/FormtPost";
import { SinglePost } from "@/components/shared/SinglePost";
import { NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Tabs } from "./Tabs";
import React from "react";
import { Button } from "react-native-elements";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  //   const { user } = useAuth(); // Supondo que seu AuthProvider tenha um estado de usuário

  return (
    <NavigationIndependentTree>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ title: "Formulário" }}
          name="FormPost"
          component={FormPost}
        />
        <Stack.Screen
          options={({ navigation, route }) => ({
            title: "Aula",
            headerBackTitle: "Voltar",
            headerLeft: () => {
              const prevRoute = route?.params as Record<string, unknown>;
              return (
                <Button
                  iconRight
                  icon={{ name: "arrow-back" }}
                  onPress={() => {
                    if (prevRoute?.origin && prevRoute.origin === "FormPost") {
                      navigation.navigate("Home", {
                        screen: "Dashboard",
                      });
                    } else {
                      navigation.goBack();
                    }
                  }}
                />
              );
            },
          })}
          name="SinglePost"
          component={SinglePost}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ title: "Editar usuário" }}
        />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}
