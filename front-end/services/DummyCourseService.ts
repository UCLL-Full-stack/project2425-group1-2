import { CourseShort, Student } from "@/types";
import StudentService from "./DummyStudentService";
import { ErrorState } from "@/types/errorState";

const courses = [
  {
    id: 1,
    name: "Introduction to Programming",
    description: "Learn the basics of programming.",
    phase: 1,
    credits: 3,
    lecturers: ["Dr. Smith"],
    isElective: false,
    requiredPassedCourses: [],
  },
  {
    id: 2,
    name: "Data Structures",
    description: "Understand data organization and manipulation.",
    phase: 2,
    credits: 4,
    lecturers: ["Prof. Johnson"],
    isElective: false,
    requiredPassedCourses: [],
  },
  {
    id: 3,
    name: "Operating Systems",
    description: "Explore the principles of operating systems.",
    phase: 3,
    credits: 3,
    lecturers: ["Dr. Brown"],
    isElective: false,
    requiredPassedCourses: [],
  },
  {
    id: 4,
    name: "Database Systems",
    description: "Learn about database design and management.",
    phase: 2,
    credits: 3,
    lecturers: ["Dr. White"],
    isElective: true,
    requiredPassedCourses: [],
  },
  {
    id: 5,
    name: "Artificial Intelligence",
    description: "Introduction to AI concepts and techniques.",
    phase: 4,
    credits: 4,
    lecturers: ["Prof. Green"],
    isElective: true,
    requiredPassedCourses: [],
  },
];

const getCoursesForStudent = async (
  studentId: number,
  errorCallback?: (error: ErrorState) => void
): Promise<CourseShort[]> => {
  let student: Student | undefined = await StudentService.getStudentById(
    studentId,
    errorCallback
  );
  if (!student) {
    return [];
  }

  return courses.filter((course) => {
    const year = Math.ceil(course.phase / 2);
    return (
      year === student.year &&
      (!course.requiredPassedCourses ||
        course.requiredPassedCourses.every((c) =>
          student.passedCourses.includes(c)
        ))
    );
  });
};

const DummyCourseService = {
  getCoursesForStudent,
};

export default DummyCourseService;
