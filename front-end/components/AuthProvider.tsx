import { LoginData, SessionData } from "@/types/auth";
import { BACKEND_APP_URL } from "@/utils/urls";
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  data: SessionData | null;
  token: string | null;
  login: (data: LoginData) => void;
  logout: () => void;
}


const AUTH_CONTEXT = createContext<AuthContextType | undefined>(undefined);
const URL = BACKEND_APP_URL + "/auth";

interface AuthProviderProps {
  children: ReactNode;
}


const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<SessionData | null>(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const ROUTER = useRouter();
  const login = async (data: LoginData) => {
    try {
      const response = await fetch(URL+"/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setData(res.data);
        setToken(res.token);
        localStorage.setItem("token", res.token);
        ROUTER.push("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setData(null);
    setToken("");
    localStorage.removeItem("site");
    ROUTER.push("/");
  };

  return (
    <AUTH_CONTEXT.Provider value={{ token, data, login, logout }}>
      {children}
    </AUTH_CONTEXT.Provider>
  );

};

export default React.memo(AuthProvider);

export const useAuth = () => {
  const context = useContext(AUTH_CONTEXT);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

