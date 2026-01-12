import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  handleWriteSession: (session: { user: any }) => void;
  isSignIn: boolean;
  clearSession: () => void;
  updateUser?: (updatedData: any) => void;
  isTeacher: boolean;
  user?: { name?: string; id?: number; email?: string; password?: string };
}

const defaultAuthContextData = {
  isSignIn: false,
  isTeacher: false,
};

const AuthContext = createContext<AuthContextData>({
  ...defaultAuthContextData,
} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    name?: string;
    id?: number;
    email?: string;
    password?: string;
  }>();
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);

  const handleWriteSession = async (session: { user: any }) => {
    const { user } = session;
    const newUser = {
      id: user.id,
      name: user.username,
      email: user.email,
      password: user.password,
    };
    await AsyncStorage.setItem("username", `${newUser.name}`);
    await AsyncStorage.setItem("email", `${newUser.email}`);
    await AsyncStorage.setItem("userId", `${newUser.id}`);
    setUser(newUser);
    setIsSignIn(true);

    if (+user.permission_type === 1) {
      await AsyncStorage.setItem("token", `${user.permissionType}`);
      setIsTeacher(true);
    }
  };

  const clearSession = async () => {
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("token");
    setUser({ name: "", id: undefined, email: "", password: "" });
    setIsSignIn(false);
  };

  const updateUser = async (updatedData: any) => {
    try {
      if (!user) return;
      await AsyncStorage.setItem("username", `${updatedData.username}`);
      await AsyncStorage.setItem("email", `${updatedData.email}`);
      setUser(updatedData);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleWriteSession,
        clearSession,
        updateUser,
        isTeacher,
        isSignIn,
      }}
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
