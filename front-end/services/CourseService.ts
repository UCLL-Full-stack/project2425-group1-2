import { BACKEND_APP_URL } from "@/utils/urls";
import { CourseUpdateView } from "../types/index";
import { ErrorState } from "@/types/errorState";

const URL = BACKEND_APP_URL + "/courses";

const handleResponse = async (response: Response, errorCallback?: (error: ErrorState) => void) => {
  const data = await response.json();
  if (!response.ok) {
    if (errorCallback) {
      errorCallback(data);
    }
  }
  return data;
};

const getAllCourses = async (errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(URL);
  return handleResponse(response, errorCallback);
};

const getAllShortCourses = async (errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/short`);
  return handleResponse(response, errorCallback);
};

const getCourseById = async (id: number, errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/${id}`);
  return handleResponse(response, errorCallback);
};

const getCoursesForStudent = async (studentId: number, errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/for-student/${studentId}`);
  return handleResponse(response, errorCallback);
}

const createCourse = async (course: CourseUpdateView, errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  return handleResponse(response, errorCallback);
};

const updateCourse = async (id: number, course: CourseUpdateView, errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  return handleResponse(response, errorCallback);
};

const deleteCourses = async (courseIds: number[], errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseIds),
  });
  return handleResponse(response, errorCallback);
};

const CourseService = {
  getAllCourses,
  getAllShortCourses,
  getCourseById,
  getCoursesForStudent,
  createCourse,
  updateCourse,
  deleteCourses,
};

export default CourseService;
