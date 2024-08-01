"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUser } from "../api/userApi";

interface User {
  fullName: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean | ((prev: boolean) => boolean)) => void;
}
interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("token")) {
        try {
          setIsLoading(true);
          let res = await getUser();
          setUser(res);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch user", error);
          localStorage.removeItem("token");
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function AppWrapper({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
