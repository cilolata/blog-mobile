import { NavigationIndependentTree } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SinglePost } from "@/components/shared/SinglePost";
import { ThemeProvider } from "react-native-elements";
import { Home } from "@/components/screens/Home";
import { Login } from "@/components/screens/Login";
import { AuthProvider } from "@/context/AuthContext";

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationIndependentTree>
          <Navigator initialRouteName="Login">
            <Screen name="Login" component={Login} />
            <Screen name="Home" component={Home} />
            <Screen
              options={{ title: "Blog de aulas" }}
              name="SinglePost"
              component={SinglePost}
            />
          </Navigator>
        </NavigationIndependentTree>
      </AuthProvider>
    </ThemeProvider>
  );
}
