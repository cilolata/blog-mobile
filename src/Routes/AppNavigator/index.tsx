import { Login } from "@/components/screens/Login";
import { EditProfile } from "@/components/shared/EditProfile";
import { FormPost } from "@/components/shared/FormtPost";
import { SinglePost } from "@/components/shared/SinglePost";
import { NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "react-native-elements";
import { useAuthContext } from "@/context/AuthContext";
import { TouchableOpacity, Text } from "react-native";
import { Tabs } from "./Tabs";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isSignIn, isTeacher, clearSession, user } = useAuthContext();
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({ navigation, route }) => ({
          title: route.name === "Login"
            ? "Login"
            : "Olá, " + (user?.username || "Usuário"),
          headerRight: () => {
            if (route.name === "Login" && !isSignIn) return null;
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login")
                  clearSession();

                }}
                style={{ marginRight: 15, padding: 5 }}
              >
                <Text style={{ color: "red", fontWeight: "bold" }}>Sair</Text>
              </TouchableOpacity>
            );
          },
        })}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerBackVisible: false }}
        />
        <>
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{ title: "Blog de aulas", headerBackVisible: false }}
          />
          {isTeacher && (
            <>
              <Stack.Screen
                name="FormPost"
                component={FormPost}
                options={{ title: "Blog de aulas", headerBackVisible: false }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ title: "Editar usuário" }}
              />
            </>
          )}
          <>
            <Stack.Screen
              name="SinglePost"
              component={SinglePost}
              options={({ navigation, route }) => ({
                headerBackTitle: "Voltar",
                headerLeft: () => {
                  const prevRoute = route?.params as Record<string, unknown>;
                  return (
                    <Button
                      type="clear"
                      iconRight
                      icon={{ name: "arrow-back" }}
                      onPress={() => {
                        if (
                          prevRoute?.origin &&
                          prevRoute.origin === "FormPost" &&
                          isTeacher
                        ) {
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
            />
          </>
        </>
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}
