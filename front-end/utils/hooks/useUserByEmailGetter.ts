import UserService from "@/services/UserService";
import { Administrative, Student } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useUserByEmailGetter = (
  email: string,
  errorCallback?: (error: ErrorState) => void
) => {
  const [user, setUser] = useState<Administrative | Student | undefined>(undefined);

  const getUser = async () => {
    const newUser = await UserService.getUserByEmail(email, errorCallback);
    setUser(newUser);
  };

  useEffect(() => {
    getUser();
  }, [email]);

  return { user, setUser, getUser };
};
