import User from "types/user";

export type AuthData = {
  username?: string;
  email: string;
  password: string;
};

export type AuthState = {
   isLoading: boolean;
   error: string | null;
   user: User | null;
 };