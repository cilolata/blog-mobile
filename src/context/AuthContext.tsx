import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  handleWriteSession: (session: { user: any }) => void;
  isTeacher: boolean;
  clearSession: () => void;
}

const defaultAuthContextData: AuthContextData = {
  handleWriteSession: () => {},
  isTeacher: false,
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
  const [user, setUser] = useState<any>(null);

  const handleWriteSession = async (session: { user: any }) => {
    const { user } = session;
    const newUser = {
      id: user.id,
      username: user.username,
      permissionType: user.permission_type,
    };
    await AsyncStorage.setItem("permissionType", `${newUser.permissionType}`);
    await AsyncStorage.setItem("username", `${newUser.username}`);
    await AsyncStorage.setItem("userId", `${newUser.id}`);
  };

  const sessionData = async () => {
    const permissionType = await AsyncStorage.getItem("permissionType");
    setIsTeacher(!!permissionType && permissionType?.toString() === "1");
  };

  const clearSession = async () => {
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("permissionType");
  };

  return (
    <AuthContext.Provider
      value={{ handleWriteSession, isTeacher, clearSession }}
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
