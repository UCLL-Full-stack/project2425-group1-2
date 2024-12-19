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
  role: Role;
  year: number;
  nationality?: string;
  passedCourses: CourseShort[];
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

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export enum Role{
  STUDENT = "student",
  ADMIN = "admin",
  NONE = "none",
}

export type Admin = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  privileges: Privilege[];
}

export type Privilege = {
  id: number;
  name: number
  description: string;
}

export const enum PrivilegeType {
  NONE = 1,
  CREATE_ISP = 2,
  UPDATE_ISP = 3,
  DELETE_ISP = 4,
  CREATE_STUDENT = 5,
  UPDATE_STUDENT = 6,
  DELETE_STUDENT = 7,
  CREATE_COURSE = 8,
  UPDATE_COURSE = 9,
  DELETE_COURSE = 10,
  CREATE_ADMINISTRATIVE = 11,
  UPDATE_ADMINISTRATIVE = 12,
  DELETE_ADMINISTRATIVE = 13,
}
