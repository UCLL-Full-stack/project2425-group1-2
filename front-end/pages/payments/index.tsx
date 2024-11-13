import ErrorDialog from "@/components/ErrorDialog";
import StudentsOverviewSection from "@/components/students/StudentsOverviewSection";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useStudentsShortGetter } from "@/utils/hooks/useStudentsShortGetter";
import { PAYMENTS_URL } from "@/utils/urls";
import Head from "next/head";

const TITLE = "Payments";

export default function ProfileManagement() {
  const { errors, setErrors, handleError } = useErrorHandler();
  const { students } = useStudentsShortGetter(handleError);

  const tabIsActive = Object.keys(errors).length === 0;

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
