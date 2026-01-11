import { ProfileList } from "@/components/shared/ProfileList";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <ProfileList />
    </SafeAreaView>
  );
};
