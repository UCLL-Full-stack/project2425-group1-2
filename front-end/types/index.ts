export type Course = {
  id: number;
  name: string;
  description: string;
  phase: number;
  credits: number;
  lecturers: string[];
  isElective: boolean;
  requiredPassedCourses: { id: number, name: string }[];
};

export type CourseShort = {
  id: number;
  name: string;
  phase: number;
  credits: number;
};

export type CourseItem = {
  id: number;
  name: string;
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


export function convertCourseToUpdateView(course: Course): CourseUpdateView {
  return {
    name: course.name,
    description: course.description,
    phase: course.phase,
    credits: course.credits,
    lecturers: course.lecturers,
    isElective: course.isElective,
    requiredPassedCourses: course.requiredPassedCourses.map(c => c.id),
  };
}


export type Student = {
  id: number;
  name: string;
  email: string;
  password: string;
  nationality?: string;
  passedCourses: { id: number, name: string }[];
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

export function convertStudentToUpdateView(student: Student): StudentUpdateView {
  return {
    name: student.name,
    email: student.email,
    password: student.password,
    nationality: student.nationality,
    passedCourses: student.passedCourses.map(c => c.id),
  };
}

export enum ISPStatus {
  SUBMITTED = "SUBMITTED",
  NOTSUBMITTED = "NOTSUBMITTED"
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
  studentId: { id: number, name: string };
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
  status: ISPStatus;
  courses: number[];
};

export function convertISPToUpdateView(isp: ISP): UpdateISPView {
  return {
    totalCredits: isp.totalCredits,
    startYear: isp.startYear,
    status: isp.status,
    courses: isp.courses.map(course => course.id),
  };
}

export function convertISPToCreateView(isp: ISP): CreateISPView {
  return {
    totalCredits: isp.totalCredits,
    startYear: isp.startYear,
    studentId: isp.student.id,
    status: isp.status,
    courses: isp.courses.map(course => course.id),
  };
}
