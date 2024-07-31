"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUser } from "../api/userApi";

const UserContext = createContext<UserContext | undefined>(undefined);

export function UserProvider({ children }) {
  const [user, setUser] = useState<user | null>(null);

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

export function AppWrapper({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
