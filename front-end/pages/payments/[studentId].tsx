import ErrorDialog from "@/components/ErrorDialog";
import { StudentShort } from "@/types";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Payments";

export default function ProfileManagement() {
  const [students, setStudents] = useState<StudentShort[]>([]);
  const {errors, setErrors, handleError} = useErrorHandler();

  const tabIsActive = Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
