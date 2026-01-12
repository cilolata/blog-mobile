import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PostList } from "@/components/shared/PostsList";
import { Dashboard } from "@/components/screens/Dashboard";
import { ProfileManager } from "@/components/screens/ProfileManager";
import { useAuthContext } from "@/context/AuthContext";
import { EditProfile } from "@/components/shared/EditProfile";

const { Navigator, Screen } = createBottomTabNavigator();

export function Tabs() {
  const { isTeacher, user } = useAuthContext();

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
      }}
    >
      <Screen
        name="Home"
        component={PostList}
        options={{
          headerShown: false,          
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      {isTeacher ? (
        <>
          <Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="archive-outline" size={size} color={color} />
              ),
            }}
          />
          <Screen
            name="ProfileScreen"
            component={ProfileManager}
            options={{
              headerShown: false,
              title: "Usuários",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          /> 
          </>
          ) : (
           <Screen
            name="EditProfile"
            component={EditProfile}
            options={({ navigation }) => ({
              headerShown: false,
              title: "Meu Perfil",
              tabBarIcon: ({ color, size }) => (
                <Ionicons onPress={() => { 
                  navigation.navigate("EditProfile", { user })
                }} 
                name="person-outline" size={size} color={color} />
              ),
            })}
          />
          )}
    </Navigator>
  );
}
