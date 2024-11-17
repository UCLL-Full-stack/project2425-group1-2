import { DummyAuthService } from "@/services/DummyAuthService";
import { LoginData, SessionData } from "@/types/auth";
import { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthContextType {
  data: SessionData | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

const AUTH_CONTEXT = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<SessionData | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("data");

    if (storedToken && storedUserData) {
      setToken(storedToken);
      setData(JSON.parse(storedUserData));
    }
  }, []);

  const ROUTER = useRouter();
  const login = async (data: LoginData) => {
    try {
      const response = await DummyAuthService.login(data);
      if (response.data) {
        setData(response.data);
        setToken(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("data", JSON.stringify(response.data));
        ROUTER.push("/");
        return;
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setData(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("data");
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
