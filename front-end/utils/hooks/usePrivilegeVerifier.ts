import DummyUserService from "@/services/DummyUserService";
import { Admin, Student } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const usePrivilegeVerifier = (
  email: string,
  errorCallback?: (error: ErrorState) => void
) => {
  const [user, setUser] = useState<Admin | Student | undefined>(undefined);

  const getUser = async () => {
    const newUser = await DummyUserService.getUserByEmail(email, errorCallback);
    setUser(newUser);
  };

  useEffect(() => {
    getUser();
  }, [email]);

  return { user, setUser, getUser };
};
