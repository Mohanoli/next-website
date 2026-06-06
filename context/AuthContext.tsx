"use client";
import { createContext } from "react";
import { IUser, ICredentials } from "@/lib/types/AuthTypes";

export interface IAuthContext {
  loggedInUser: IUser;
  isLoading: boolean;
  login: (cred: ICredentials) => Promise<void>;
  register: (user: any) => Promise<void>;
  logout: () => void;
  getLoggedInUserProfile: () => Promise<IUser>;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: {} as IUser,
  isLoading: false,
  login: async () => { },
  register: async () => { },
  logout: () => { },
  getLoggedInUserProfile: async () => ({} as IUser),
});
