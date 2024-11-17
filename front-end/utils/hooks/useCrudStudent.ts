import DummyStudentService from "@/services/DummyStudentService";
import { Student, UserShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useCrudStudent = (
  errorCallback?: (error: ErrorState) => void
) => {
  const [students, setStudents] = useState<UserShort[]>([]);

  const getStudents = async () => {
    const courses: UserShort[] = await DummyStudentService.getAllShortStudents(
      errorCallback
    );
    setStudents(courses);
  };

  const updateStudent = async (student: Student) => {
    // const updateStudentView = convertStudentToUpdateView(student);
    await DummyStudentService.updateStudent(student.id, student, errorCallback);
    await getStudents();
  };

  const createStudent = async (student: Student) => {
    // const updateStudentView = convertStudentToUpdateView(student);
    await DummyStudentService.createStudent(student, errorCallback);
    await getStudents();
  };

  const deleteStudent = async (id: number) => {
    await DummyStudentService.deleteStudent(id, errorCallback);
    await getStudents();
  };

  useEffect(() => {
    getStudents();
  }, []);

  return { students, setStudents, getStudents, updateStudent, createStudent, deleteStudent };
};
