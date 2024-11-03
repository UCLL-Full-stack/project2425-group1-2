export type Course = {
  id: number;
  name: string;
  description: string;
  phase: number;
  credits: number;
  lecturers: string[];
  isElective: boolean;
  requiredPassedCourses: Course[];
};

export type CourseShort = {
  id: number;
  name: string;
  phase: number;
  credits: number;
};
