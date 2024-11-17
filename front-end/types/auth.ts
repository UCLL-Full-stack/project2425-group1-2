import { Role } from ".";

export type LoginData = {
  username: string;
  password: string;
};

export type SessionData = {
  userId: number;
  email: string;
  role: Role;
  privileges?: number[];
};
