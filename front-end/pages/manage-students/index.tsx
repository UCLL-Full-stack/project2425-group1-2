import FixedCreateButton from "@/components/buttons/FixedCreateButton";
import ErrorDialog from "@/components/ErrorDialog";
import MapObjectsLayout from "@/components/layouts/MapObjectsLayout";
import StudentForm from "@/components/users/students/student_form/StudentForm";
import StudentEditableItem from "@/components/users/students/StudentEditableItem";
import StudentService from "@/services/DummyStudentService";
import { EntityItem, Student } from "@/types";
import { getDefaultStudent } from "@/utils/defaultTypes";
import { useCoursesShortGetter } from "@/utils/hooks/useCoursesShortGetter";
import { useCrudStudent } from "@/utils/hooks/useCrudStudent";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage Students";
const MAIN_SECTION_TITLE = "Manage students";

export default function manageStudents() {
  const [updatingStudent, setUpdatingStudent] = useState<Student | null>(null);
  const [creatingStudent, setCreatingStudent] = useState<Student | null>(null);
  const { errors, setErrors, handleError } = useErrorHandler();
  const { students, updateStudent, createStudent, deleteStudent } =
    useCrudStudent(handleError);
  const { courses } = useCoursesShortGetter(handleError);

  const handleCreate = () => {
    const student: Student = getDefaultStudent();
    setCreatingStudent(student);
  };

  const handleUpdate = async (id: number) => {
    const student: Student | undefined = await StudentService.getStudentById(
      id,
      handleError
    );
    if (student) {
      setUpdatingStudent(student);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
    setUpdatingStudent(null);
  };

  const handleSubmit = async (student: Student) => {
    if (updatingStudent) {
      await updateStudent(student);
      setUpdatingStudent(null);
      return;
    }
    await createStudent(student);
    setCreatingStudent(null);
    return;
  };

  const handleCancel = () => {
    setUpdatingStudent(null);
    setCreatingStudent(null);
  };

  const getPossiblePassedCourses = (student: Student): EntityItem[] => {
    const passedCourseIds = new Set(
      student.passedCourses.map((course) => course.id)
    );

    return courses
      .filter((course) => !passedCourseIds.has(course.id))
      .map((course) => ({ id: course.id, name: course.name }));
  };

  const ManageTabisActive =
    updatingStudent == null &&
    creatingStudent == null &&
    Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <h1 className="text-center mt-5">{MAIN_SECTION_TITLE}</h1>
      <MapObjectsLayout
        objects={students}
        flex="row"
        children={(student) => (
          <StudentEditableItem
            student={student}
            redactorStudent={handleUpdate}
            isActive={ManageTabisActive}
          />
        )}
      />
      <FixedCreateButton onClick={handleCreate} isActive={ManageTabisActive} />
      <StudentForm
        student={updatingStudent || creatingStudent}
        formName={updatingStudent ? "Update Student" : "Create Student"}
        getPossiblePassedCourses={getPossiblePassedCourses}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onDelete={updatingStudent ? handleDelete : undefined}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
