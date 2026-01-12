import { AuthProvider } from "@/context/AuthContext";
import { NavigationIndependentTree } from "@react-navigation/native";
import React from "react";
import { ThemeProvider } from "react-native-elements";
import { GenericProvider } from "@/context/GenericContext";
import Toast from 'react-native-toast-message';
import AppNavigator from "./AppNavigator";


export function Routes() {
  return (
    <ThemeProvider>
      <NavigationIndependentTree>
        <AuthProvider>
          <GenericProvider>
              <AppNavigator />
              <Toast />
          </GenericProvider>
        </AuthProvider>
      </NavigationIndependentTree>
    </ThemeProvider>
  );
}
