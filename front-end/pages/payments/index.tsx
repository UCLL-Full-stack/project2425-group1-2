import ErrorDialog from "@/components/ErrorDialog";
import StudentsOverviewSection from "@/components/students/StudentsOverviewSection";
import StudentService from "@/services/DummyStudentService";
import { StudentShort } from "@/types";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { PAYMENTS_URL } from "@/utils/urls";
import Head from "next/head";
import { useEffect, useState } from "react";

const TITLE = "Payments";

export default function ProfileManagement() {
  const [students, setStudents] = useState<StudentShort[]>([]);
  const {errors, setErrors, handleError} = useErrorHandler();

  const getStudents = async () => {
    const courses: StudentShort[] = await StudentService.getAllShortStudents(
      handleError
    );
    setStudents(courses);
  };

  const tabIsActive = Object.keys(errors).length === 0;

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <StudentsOverviewSection
        students={students}
        isActive={tabIsActive}
        url={PAYMENTS_URL}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
