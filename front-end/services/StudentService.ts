import { BACKEND_APP_URL } from "@/utils/urls";
import { Student, StudentUpdateView } from "../types/index";

const URL = BACKEND_APP_URL + "/students";

let students: Student[] = [
  {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: 'password123',
      nationality: 'American',
      passedCourses: [],
  },
  {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      password: 'password123',
      nationality: 'British',
      passedCourses: [],
  },
  {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      password: 'password123',
      nationality: 'Canadian',
      passedCourses: [],
  },
  {
      id: 4,
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      password: 'password123',
      nationality: 'Australian',
      passedCourses: [],
  },
  {
      id: 5,
      name: 'Ethan Hunt',
      email: 'ethan.hunt@example.com',
      password: 'password123',
      nationality: 'New Zealander',
      passedCourses: [],
  },
];

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
  // Fetch all students from the backend
  // const response = await fetch(URL);
  // return handleResponse(response, errorCallback);

  // Dummy functionality using the students variable
  return students;
};

const getAllShortStudents = async (errorCallback?: (error: any) => void) => {
  // Fetch all students in short form from the backend
  // const response = await fetch(`${URL}/shortform`);
  // return handleResponse(response, errorCallback);

  // Dummy functionality using the students variable
  return students.map(student => ({ id: student.id, name: student.name }));
};

const getStudentById = async (id: number, errorCallback?: (error: any) => void) => {
  // Fetch a student by ID from the backend
  // const response = await fetch(`${URL}/${id}`);
  // return handleResponse(response, errorCallback);

  // Dummy functionality using the students variable
  const student = students.find(student => student.id === id);
  if (!student && errorCallback) {
    errorCallback({
      status: "application error",
      message: `Student with ID ${id} does not exist.`,
    });
  }
  return student;
};

const createStudent = async (student: Student, errorCallback?: (error: any) => void) => { //Change student type to StudenUpdateView
  // Create a new student in the backend
  // const response = await fetch(URL, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(student),
  // });
  // return handleResponse(response, errorCallback);

  // Dummy functionality using the students variable
  const newStudent = { ...student, id: students.length + 1 };
  students.push(newStudent as Student);
  return newStudent;
};

const updateStudent = async (id: number, student: Student, errorCallback?: (error: any) => void) => { //Change student type to StudenUpdateView
  // Update a student in the backend
  // const response = await fetch(`${URL}/${id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(student),
  // });
  // return handleResponse(response, errorCallback);

  // Dummy functionality using the students variable
  const index = students.findIndex(s => s.id === id);
  if (index === -1) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `Student with ID ${id} does not exist. Update failed.`,
      });
    }
    return null;
  }
  students[index] = { ...students[index], ...student };
  return students[index];
};

const deleteStudent = async (id: number, errorCallback?: (error: any) => void) => {
  // Delete a student in the backend
  // const response = await fetch(`${URL}/${id}`, {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //   }
  // });
  // return handleResponse(response, errorCallback);

  // Dummy functionality using the students variable
  const index = students.findIndex(student => student.id === id);
  if (index === -1) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `Student with ID ${id} does not exist. Deletion failed.`,
      });
    }
    return null;
  }
  const deletedStudent = students.splice(index, 1);
  return deletedStudent[0];
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
