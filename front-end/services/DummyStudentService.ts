import { ErrorState } from "@/types/errorState";
import { Role, Student } from "../types/index";

export let students: Student[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "password123",
    nationality: "American",
    passedCourses: [],
    year: 1,
    role: Role.STUDENT,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    password: "password123",
    nationality: "British",
    passedCourses: [],
    year: 2,
    role: Role.STUDENT,
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    password: "password123",
    nationality: "Canadian",
    passedCourses: [],
    year: 3,
    role: Role.STUDENT,
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    password: "password123",
    nationality: "Australian",
    passedCourses: [],
    year: 2,
    role: Role.STUDENT,
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    password: "password123",
    nationality: "New Zealander",
    passedCourses: [],
    year: 2,
    role: Role.STUDENT,
  },
];

let nextId = students.length + 1;

const getAllStudents = async (errorCallback?: (error: ErrorState) => void) => {
  return students;
};

const getAllShortStudents = async (
  errorCallback?: (error: ErrorState) => void
) => {
  return students.map((student) => ({ id: student.id, name: student.name }));
};

const getStudentById = async (
  id: number,
  errorCallback?: (error: ErrorState) => void
) => {
  const student = students.find((student) => student.id === id);
  if (!student && errorCallback) {
    errorCallback({
      status: "application error",
      message: `Student with ID ${id} does not exist.`,
    });
  }
  return student;
};

const createStudent = async (
  student: Student,
  errorCallback?: (error: ErrorState) => void
) => {
  const newStudent = { ...student, id: nextId++ };
  students.push(newStudent as Student);
  return newStudent;
};

const updateStudent = async (
  id: number,
  student: Student,
  errorCallback?: (error: ErrorState) => void
) => {
  const index = students.findIndex((s) => s.id === id);
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

const deleteStudent = async (
  id: number,
  errorCallback?: (error: ErrorState) => void
) => {
  const index = students.findIndex((student) => student.id === id);
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

const DummyStudentService = {
  getAllStudents,
  getAllShortStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default DummyStudentService;
