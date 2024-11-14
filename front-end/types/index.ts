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