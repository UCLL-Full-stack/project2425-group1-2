import ErrorDialog from "@/components/ErrorDialog";
import StudentsOverviewSection from "@/components/students/StudentsLinksSection";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useStudentsShortGetter } from "@/utils/hooks/useStudentsShortGetter";
import { MY_ISP_URL } from "@/utils/urls";
import Head from "next/head";

const TITLE = "My ISP";

export default function MyISP() {
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
        url={MY_ISP_URL}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
