"use client";
import {createContext, useContext, useState, ReactNode} from "react";

type UserInfo = {
  email: string;
  fullName: string;
  password: string;
};

type UserContextType = {
  user: UserInfo;
  setUser: (user: Partial<UserInfo>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: {children: ReactNode}) {
  const [user, setUserState] = useState<UserInfo>({
    email: "",
    fullName: "",
    password: "",
  });
  const setUser = (newUser: Partial<UserInfo>) => {
    setUserState((prev) => ({...prev, ...newUser}));
  };
  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
