import { BACKEND_APP_URL } from "@/utils/urls";
import { ErrorState } from "@/types/errorState";

const URL = BACKEND_APP_URL + "/users";

const handleResponse = async (response: Response, errorCallback?: (error: ErrorState) => void) => {
  const data = await response.json();
  if (!response.ok) {
    if (errorCallback) {
      errorCallback(data);
    }
  }
  return data;
};

const getUserByEmail = async (email: string, errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/${email}`);
  return handleResponse(response, errorCallback);
}

const UserService = {
  getUserByEmail,
};

export default UserService;
