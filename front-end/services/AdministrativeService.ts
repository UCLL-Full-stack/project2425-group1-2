import { BACKEND_APP_URL } from "@/utils/urls";
import { ErrorState } from "@/types/errorState";
import { Administrative, UserShort } from "@/types";

const URL = BACKEND_APP_URL + "/admins";

const handleResponse = async (response: Response, errorCallback?: (error: ErrorState) => void) => {
  const data = await response.json();
  if (!response.ok) {
    if (errorCallback) {
      errorCallback(data);
    }
    throw new Error(data.message || "An error occurred");
  }
  return data;
};

const getAllAdministratives = async (errorCallback?: (error: ErrorState) => void): Promise<Administrative[]> => {
  const response = await fetch(URL);
  return handleResponse(response, errorCallback);
};

const getAllShortAdministratives = async (errorCallback?: (error: ErrorState) => void): Promise<UserShort[]> => {
  const response = await fetch(`${URL}/short`);
  return handleResponse(response, errorCallback);
};

const getAdministrativeById = async (id: number, errorCallback?: (error: ErrorState) => void): Promise<Administrative> => {
  const response = await fetch(`${URL}/${id}`);
  return handleResponse(response, errorCallback);
};

const createAdministrative = async (
  admin: Administrative,
  errorCallback?: (error: ErrorState) => void
): Promise<Administrative> => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
  });
  return handleResponse(response, errorCallback);
};

const updateAdministrative = async (
  id: number,
  admin: Administrative,
  errorCallback?: (error: ErrorState) => void
): Promise<Administrative> => {
  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
  });
  return handleResponse(response, errorCallback);
};

const deleteAdministrative = async (id: number, errorCallback?: (error: ErrorState) => void): Promise<String> => {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response, errorCallback);
};

const AdministrativeService = {
  getAllAdministratives,
  getAllShortAdministratives,
  getAdministrativeById,
  createAdministrative,
  updateAdministrative,
  deleteAdministrative,
};

export default AdministrativeService;
