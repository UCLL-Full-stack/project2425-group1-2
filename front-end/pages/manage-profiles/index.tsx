import CourseForm from "@/components/courses/course_form/CourseForm";
import CourseManagementOverviewTab from "@/components/courses/CourseManagementOverviewSection";
import ErrorDialog from "@/components/ErrorDialog";
import CourseService from "@/services/CourseService";
import { Course, CourseShort, Student, StudentShort, convertCourseToUpdateView, convertStudentToUpdateView } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const TITLE = "Manage Profiles";

export default function ProfileManagement() {
  const [students, setStudents] = useState<StudentShort[]>([]);
  const [updatingStudent, setUpdatingStudent] = useState<Student | null>(null);
  const [creatingStudent, setCreatingStudent] = useState<Student | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getStudents = async () => {
    const students: StudentShort[] = await StudentService.getAllShortStudents(handleError);
    setStudents(students);
  };

  const redactorStudent = async (id: number) => {
    const student: Student = await StudentService.getStudentById(id, handleError);
    setUpdatingStudent(student);
  };

  const updateStudent = async (student: Student) => {
    const updateStudentView = convertStudentToUpdateView(student);
    await StudentService.updateStudent(student.id, updateStudentView, handleError);
    setUpdatingStudent(null);
    getStudents();
  };

  const createStudent = async (student: Student) => {
    const updateStudentView = convertStudentToUpdateView(student);
    await StudentService.createStudent(updateStudentView, handleError);
    setCreatingStudent(null);
    getStudents();
  };

  const deleteStudent = async (id: number) => {
    await StudentService.deleteStudents([id], handleError);
    setUpdatingStudent(null);
    getStudents();
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
    updatingCourse == null &&
    creatingCourse == null &&
    Object.keys(errors).length === 0;

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <CourseManagementOverviewTab
        courses={courses}
        isActive={overviewTabIsActive}
        detailedCourses={detailedCourses}
        redactorCourse={redactorCourse}
        setCreatingCourse={setCreatingCourse}
        toggleCourseDetails={toggleCourseDetails}
      />
      <CourseForm
        course={updatingCourse || creatingCourse}
        getPossibleRequiredCourses={getPossibleRequiredPassedCourses}
        onSubmit={updatingCourse ? updateCourse : createCourse}
        onCancel={
          updatingCourse
            ? () => setUpdatingCourse(null)
            : () => setCreatingCourse(null)
        }
        onDelete={updatingCourse ? deleteCourse : undefined}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
