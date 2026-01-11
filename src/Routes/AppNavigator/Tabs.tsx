import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { PostList } from "@/components/shared/PostsList";
import { Home } from "@/components/screens/Home";
import { Dashboard } from "@/components/screens/Dashboard";

const { Navigator, Screen } = createBottomTabNavigator();

export function Tabs() {
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
          title: "Blog de aulas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
        <Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
      <Screen
        name="ProfilesScreen"
        component={ProfileScreen}
        options={{
          title: "Usuários",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
