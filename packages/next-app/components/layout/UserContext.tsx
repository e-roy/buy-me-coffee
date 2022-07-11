import { createContext, Dispatch } from "react";

export interface IUserProfile {
  address: string;
  name: string;
  avatar: string;
  userType: string;
}

export type UserContextType = {
  currentUser?: IUserProfile;
  setCurrentUser: Dispatch<IUserProfile>;
};

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  setCurrentUser: () => {},
});
