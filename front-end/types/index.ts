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
