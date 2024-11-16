import CourseService from "@/services/CourseService";
import DummyCourseService from "@/services/DummyCourseService";
import { CourseShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useCoursesForStudentGetter = (
  studentId: number,
  errorCallback?: (error: ErrorState) => void
) => {

  const [courses, setCourses] = useState<CourseShort[]>([]);

  const getCourses = async () => {
    const courses: CourseShort[] = await DummyCourseService.getCoursesForStudent(
      studentId,
      errorCallback
    );
    setCourses(courses);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return { courses, setCourses, getCourses };
};
