import { PostList } from "@/components/shared/PostsList";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = () => {
  return (
    <SafeAreaView>
      <PostList />
    </SafeAreaView>
  );
};
