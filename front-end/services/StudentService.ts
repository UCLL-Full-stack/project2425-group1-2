import { BACKEND_APP_URL } from "@/utils/urls";
import { StudentUpdateView } from "../types/index";

const URL = BACKEND_APP_URL + "/students";

const handleResponse = async (response: Response, errorCallback?: (error: any) => void) => {
  const data = await response.json();
  if (!response.ok) {
    if (errorCallback) {
      errorCallback(data);
    }
  }
  return data;
};

const getAllStudents = async (errorCallback?: (error: any) => void) => {
  const response = await fetch(URL);
  return handleResponse(response, errorCallback);
};

const getAllShortStudents = async (errorCallback?: (error: any) => void) => {
  const response = await fetch(`${URL}/shortform`);
  return handleResponse(response, errorCallback);
};

const getStudentById = async (id: number, errorCallback?: (error: any) => void) => {
  const response = await fetch(`${URL}/${id}`);
  return handleResponse(response, errorCallback);
};

const createStudent = async (student: StudentUpdateView, errorCallback?: (error: any) => void) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return handleResponse(response, errorCallback);
};

const updateStudent = async (id: number, student: StudentUpdateView, errorCallback?: (error: any) => void) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return handleResponse(response, errorCallback);
};

const deleteStudent = async (id: number, errorCallback?: (error: any) => void) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return handleResponse(response, errorCallback);
};

const StudentService = {
  getAllStudents,
  getAllShortStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default StudentService;
