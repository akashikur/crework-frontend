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
}
interface UserProviderProps {
  children: ReactNode; // Explicitly typing children as ReactNode
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("token")) {
        try {
          let res = await getUser();
          setUser(res);
        } catch (error) {
          console.error("Failed to fetch user", error);
          localStorage.removeItem("token"); // Optionally remove the token if fetching user fails
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
