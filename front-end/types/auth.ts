export type LoginData = {
  username: string;
  password: string;
};

export type SessionData = {
  user: string;
  roles: string[];
  privileges?: string[];
};
