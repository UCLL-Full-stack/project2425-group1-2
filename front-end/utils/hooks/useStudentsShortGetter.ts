import StudentService from "@/services/DummyStudentService";
import { StudentShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useStudentsShortGetter = (
  errorCallback?: (error: ErrorState) => void
) => {

  const [students, setStudents] = useState<StudentShort[]>([]);

  const getStudents = async () => {
    const courses: StudentShort[] = await StudentService.getAllShortStudents(
      errorCallback
    );
    setStudents(courses);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return { students, setStudents, getStudents };
};
