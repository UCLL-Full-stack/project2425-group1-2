import ErrorDialog from "@/components/ErrorDialog";
import ManageStudentsOverviewSection from "@/components/students/ManageStudentsOverviewSection";
import StudentForm from "@/components/students/student_form/StudentForm";
import CourseService from "@/services/CourseService";
import StudentService from "@/services/DummyStudentService";
import { CourseItem, CourseShort, Student, StudentShort } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const TITLE = "Manage Profiles";

export default function ProfileManagement() {
  const [students, setStudents] = useState<StudentShort[]>([]);
  const [updatingStudent, setUpdatingStudent] = useState<Student | null>(null);
  const [creatingStudent, setCreatingStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<CourseShort[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getCourses = async () => {
    const courses: CourseShort[] = await CourseService.getAllShortCourses(handleError);
    setCourses(courses);
  }

  const getStudents = async () => {
    const students: StudentShort[] = await StudentService.getAllShortStudents(handleError);
    setStudents(students);
  };

  const redactorStudent = async (id: number) => {
    const student: Student | undefined = await StudentService.getStudentById(id, handleError);
    if (student) {
      setUpdatingStudent(student);
    }
  };

  const updateStudent = async (student: Student) => {
    // const updateStudentView = convertStudentToUpdateView(student);
    await StudentService.updateStudent(student.id, student, handleError);
    setUpdatingStudent(null);
    getStudents();
  };

  const createStudent = async (student: Student) => {
    // const updateStudentView = convertStudentToUpdateView(student);
    await StudentService.createStudent(student, handleError);
    setCreatingStudent(null);
    getStudents();
  };

  const deleteStudent = async (id: number) => {
    await StudentService.deleteStudent(id, handleError);
    setUpdatingStudent(null);
    getStudents();
  };

  const getPossiblePassedCourses = (student: Student): CourseItem[] => {
    const passedCourseIds = new Set(student.passedCourses.map((course) => course.id));
  
    return courses
      .filter((course) => !passedCourseIds.has(course.id))
      .map((course) => ({ id: course.id, name: course.name }));
  };

  const handleError = (error: {}) => {
    const newErrors: { [key: string]: string } = {};
    if (error) {
      Object.entries(error).forEach(([key, value]) => {
        newErrors[key] = value as string;
      });
    }
    setErrors(newErrors);
  };
  
  const overviewTabIsActive =
    updatingStudent == null &&
    creatingStudent == null &&
    Object.keys(errors).length === 0;

  useEffect(() => {
    getStudents();
    getCourses();
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <ManageStudentsOverviewSection
        students={students}
        isActive={overviewTabIsActive}
        redactorStudent={redactorStudent}
        setCreatingStudent={setCreatingStudent}
      />
      <StudentForm
        student={updatingStudent || creatingStudent}
        getPossiblePassedCourses={getPossiblePassedCourses}
        onSubmit={updatingStudent ? updateStudent : createStudent}
        onCancel={
          updatingStudent
            ? () => setUpdatingStudent(null)
            : () => setCreatingStudent(null)
        }
        onDelete={updatingStudent ? deleteStudent : undefined}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
