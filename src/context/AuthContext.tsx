import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  handleWriteSession: (session: { user: any }) => void;
  isTeacher: boolean;
  sessionData: () => Promise<{
    username: string | null;
    userId: string | null;
  }>;
  clearSession: () => void;
}

const defaultAuthContextData: AuthContextData = {
  handleWriteSession: () => {},
  isTeacher: false,
  sessionData: async () => ({
    username: null,
    userId: null,
  }),
  clearSession: async () => {
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("permissionType");
  },
};

const AuthContext = createContext<AuthContextData>({
  ...defaultAuthContextData,
} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTeacher, setIsTeacher] = useState(false);

  const handleWriteSession = async (session: { user: any }) => {
    const { user } = session;
    const newUser = {
      id: user.id,
      username: user.username,
      permissionType: user.permission_type,
    };

    if (user) {
      await AsyncStorage.setItem("permissionType", `${user.permission_type}`);
      await AsyncStorage.setItem("username", `${user.username}`);
      await AsyncStorage.setItem("userId", `${user.id}`);
    }
  };

  const sessionData = async () => {
    const username = await AsyncStorage.getItem("username");
    const userId = await AsyncStorage.getItem("userId");
    const permissionType = await AsyncStorage.getItem("permissionType");
    setIsTeacher(!!permissionType && permissionType?.toString() === "1");
    return { username, userId };
  };

  const clearSession = async () => {
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("permissionType");
  };

  return (
    <AuthContext.Provider
      value={{ handleWriteSession, sessionData, isTeacher, clearSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};
