import { IUser } from "@/interfaces";
import {
  deleteProfile,
  getAllProfiles,
  updateProfile,
} from "@/services/profiles";
import { removeDuplicates } from "@/utils";
import { useEffect, useState } from "react";

const useProfiles = () => {
  const [profiles, setProfiles] = useState<IUser[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [pageListProfiles, setPageListProfiles] = useState(1);
  const [hasMoreProfiles, setHasMoreProfiles] = useState(true);
  const [loadingEditProfile, setLoadingEditProfile] = useState(false);


  const loadingMoreProfiles = async (value: number) => {
    setLoadingProfiles(true);
    const { data, status, error } = await getAllProfiles({ page: value });
    setPageListProfiles((prev) => prev + 1);
    if (data.users && status === 200) {
      setLoadingProfiles(false);
      setProfiles((prev) => removeDuplicates([...prev, ...data.users]))
    }

    if (error || status !== 200 || data.users.length === 0) {
      setLoadingProfiles(false);
      setHasMoreProfiles(false);
    }
  };

  const editUser = async (id: number | string, value: any) => {
    try {
      setLoadingEditProfile(true);
      if (!id) return;
      setProfiles([])
      const response = await updateProfile(id, value);
      setLoadingEditProfile(false);
      setProfiles(response.data.users);
      return response
    } catch (error) {
      console.error("Error edit profile:", error);
    }
  };

  const deleteUser = async (id?: number | string) => {
    try {
      setProfiles([]);
      setLoadingProfiles(true);
      if (!id) return;
      const { data } = await deleteProfile(id);
      setProfiles(data.users);
      setLoadingProfiles(false);
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  useEffect(() => {
    const firstFetch = async () => {
      await loadingMoreProfiles(1);
    };
    firstFetch();
  }, []);

  return {
    profiles,
    loadingProfiles,
    pageListProfiles,
    hasMoreProfiles,
    loadingMoreProfiles,
    deleteUser,
    editUser,
    loadingEditProfile
  };
};

export default useProfiles;
