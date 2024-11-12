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

export type StudentShort = {
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