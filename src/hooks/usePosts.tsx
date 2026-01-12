import { HTTPResponseStatus, IPost } from "@/interfaces";
import {
  deletePostById,
  getAllPosts,
  postNewPost,
  putPost,
  searchPost,
} from "@/services/posts";
import { removeDuplicates } from "@/utils";
import { useEffect, useState } from "react";

const usePosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [value, setValue] = useState<string | undefined>("");

  const loadingMorePosts = async (value: number) => {
    setLoading(true);
    const { data, status, error } = await getAllPosts({ page: value });
    setPage((prev) => prev + 1);
    if (error || status !== HTTPResponseStatus.OK || !data.posts.length || data.posts.length === 0) {
      setLoading(false);
      setHasMore(false);
    }
    if (data.posts && status === HTTPResponseStatus.OK) {
      setLoading(false);
      setPosts((prev) => removeDuplicates([...prev, ...data.posts]));
    }
  };

  const createPost = async (values: any) => {
    try {
      await postNewPost(values);
      await loadingMorePosts(1);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSearch = async (search?: string) => {
    setValue(search);
    try {
      if (!search) {
        await loadingMorePosts(1);
      }
      const response = await searchPost(search);
      setPosts(response.posts);
    } catch {
      console.error("Error updating search");
    }
  };

  const editPost = async (values: any) => {
    try {
      setPosts([]);
      const { id, ...rest } = values;
      const response = await putPost(id, rest);
      if (response.status === HTTPResponseStatus.OK) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id?: number | string) => {
    try {
      if (!id) return;
      setPosts([])
      const response = await deletePostById(id);
      if (response?.status === HTTPResponseStatus.OK) {
        await loadingMorePosts(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const firstFetch = async () => {
      await loadingMorePosts(page);
    };
    firstFetch();
  }, []);

  return {
    posts,
    loading,
    page,
    hasMore,
    loadingMorePosts,
    updateSearch,
    value,
    createPost,
    editPost,
    deletePost,
  };
};

export default usePosts;
