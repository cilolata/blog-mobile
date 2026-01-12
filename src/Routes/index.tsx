import { AuthProvider } from "@/context/AuthContext";
import { NavigationIndependentTree } from "@react-navigation/native";
import React from "react";
import { ThemeProvider } from "react-native-elements";
import AppNavigator from "./AppNavigator";
import { GenericProvider } from "@/context/GenericContext";
import Toast from 'react-native-toast-message';


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
