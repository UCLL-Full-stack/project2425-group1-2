import { Course, CourseUpdateView } from '../types/index';
import { BACKEND_APP_URL } from '@/utils/urls';

const URL = BACKEND_APP_URL + '/courses';

const getAllCourses = async () => {
  const response = await fetch(URL);
  return response;
}

const getAllShortCourses = async () => {
  const response = await fetch(`${URL}/short`);
  return response;
}

const getCourseById = async (id: number) => {
  const response = await fetch(`${URL}/${id}`);
  return response;
}

const createCourse = async (course: CourseUpdateView) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });
  return response;
}

const updateCourse = async (id: number, course: CourseUpdateView) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });
  return response;
}

const deleteCourses = async (courseIds: number[]) => {
  const response = await fetch(`${URL}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseIds),
  });
  return response;
}

const CourseService = {
  getAllCourses,
  getAllShortCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourses,
};

export default CourseService;
