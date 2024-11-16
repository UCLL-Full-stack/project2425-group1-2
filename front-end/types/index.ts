export type Course = {
  id: number;
  name: string;
  description: string;
  phase: number;
  credits: number;
  lecturers: string[];
  isElective: boolean;
  requiredPassedCourses: EntityItem[];
};

export type CourseShort = {
  id: number;
  name: string;
  phase: number;
  credits: number;
};

export type CourseUpdateView = {
  name: string;
  description: string;
  phase: number;
  credits: number;
  lecturers: string[];
  isElective: boolean;
  requiredPassedCourses: number[];
};

export type Student = {
  id: number;
  name: string;
  email: string;
  password: string;
  year: number;
  nationality?: string;
  passedCourses: { id: number; name: string }[];
};

export type UserShort = {
  id: number;
  name: string;
};

export type StudentUpdateView = {
  name: string;
  email: string;
  password: string;
  nationality?: string;
  passedCourses: number[];
};

export enum ISPStatus {
  SUBMITTED = "Submitted",
  NOTSUBMITTED = "Not submitted",
}

export type ISP = {
  id: number;
  status: ISPStatus;
  totalCredits: number;
  startYear: number;
  courses: CourseShort[];
  student: { id: number; name: string };
};

export type ISPShort = {
  id: number;
  status: ISPStatus;
  totalCredits: number;
  startYear: number;
  student: { id: number; name: string };
};

export type CreateISPView = {
  totalCredits: number;
  startYear: number;
  studentId: number;
  status: ISPStatus;
  courses: number[];
};

export type UpdateISPView = {
  totalCredits: number;
  startYear: number;
  studentId: number;
  status: ISPStatus;
  courses: number[];
};

export type EntityItem = {
  id: number;
  name: string;
};

export type Admin = {
  id: number;
  name: string;
  email: string;
  password: string;
  privileges: EntityItem[];
}

export const enum Privilege {
  CREATE_ISP = 1,
  UPDATE_ISP = 2,
  DELETE_ISP = 3,
  CREATE_STUDENT = 4,
  UPDATE_STUDENT = 5,
  DELETE_STUDENT = 6,
  CREATE_COURSE = 7,
  UPDATE_COURSE = 8,
  DELETE_COURSE = 9,
  CREATE_ADMINISTRATIVE = 10,
  UPDATE_ADMINISTRATIVE = 11,
  DELETE_ADMINISTRATIVE = 12,
}

export const privileges = [
  { id: Privilege.CREATE_ISP, name: "Create ISP" },
  { id: Privilege.UPDATE_ISP, name: "Update ISP" },
  { id: Privilege.DELETE_ISP, name: "Delete ISP" },
  { id: Privilege.CREATE_STUDENT, name: "Create Student" },
  { id: Privilege.UPDATE_STUDENT, name: "Update Student" },
  { id: Privilege.DELETE_STUDENT, name: "Delete Student" },
  { id: Privilege.CREATE_COURSE, name: "Create Course" },
  { id: Privilege.UPDATE_COURSE, name: "Update Course" },
  { id: Privilege.DELETE_COURSE, name: "Delete Course" },
  { id: Privilege.CREATE_ADMINISTRATIVE, name: "Create Administrative" },
  { id: Privilege.UPDATE_ADMINISTRATIVE, name: "Update Administrative" },
  { id: Privilege.DELETE_ADMINISTRATIVE, name: "Delete Administrative" },
];