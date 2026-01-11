import { AuthProvider } from "@/context/AuthContext";
import { NavigationIndependentTree } from "@react-navigation/native";
import React from "react";
import { ThemeProvider } from "react-native-elements";
import AppNavigator from "./AppNavigator";
import { GenericProvider } from "@/context/GenericContext";


export function Routes() {
  return (
    <ThemeProvider>
      <NavigationIndependentTree>
        <AuthProvider>
          <GenericProvider>
          <AppNavigator />
          </GenericProvider>
        </AuthProvider>
      </NavigationIndependentTree>
    </ThemeProvider>
  );
}
