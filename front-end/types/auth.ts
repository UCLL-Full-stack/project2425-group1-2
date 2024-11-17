import { Role } from ".";

export type LoginData = {
  username: string;
  password: string;
};

export type SessionData = {
  user: string;
  role: Role;
  privileges?: number[];
};
