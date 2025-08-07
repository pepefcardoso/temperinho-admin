import { User } from "./user";

export type AuthResponse = {
  token: string;
  user: User;
};

export type AuthState = {
  message?: string;
  success: boolean;
};