import CourseService from "@/services/CourseService";
import { CourseShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useCoursesForStudentGetter = (
  studentId: number,
  errorCallback?: (error: ErrorState) => void
) => {

  const [courses, setCourses] = useState<CourseShort[]>([]);

  const getCourses = async () => {
    const courses: CourseShort[] = await CourseService.getCoursesForStudent(
      studentId,
      errorCallback
    );
    setCourses(courses);
  };

  useEffect(() => {
    getCourses();
  }, [studentId]);

  return { courses, setCourses, getCourses };
};
