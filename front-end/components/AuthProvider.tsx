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

interface AuthContextType {
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
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("site") || "";
      setToken(storedToken);
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
