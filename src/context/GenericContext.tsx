import usePosts from "@/hooks/usePosts";
import useProfiles from "@/hooks/useProfile";
import { createContext, useContext, useMemo } from "react";

const GenericContext = createContext({} as any);

export const GenericProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const posts = usePosts();
  const profiles = useProfiles();

  const props = useMemo(
    () => ({
      ...profiles,
      ...posts,
    }),
    [posts]
  );

  return (
    <GenericContext.Provider value={props}>{children}</GenericContext.Provider>
  );
};

export const useGenericContext = () => {
  const context = useContext(GenericContext);

  if (!context)
    throw new Error("useGenericContext must be used within an GenericProvider");
  return context;
};
