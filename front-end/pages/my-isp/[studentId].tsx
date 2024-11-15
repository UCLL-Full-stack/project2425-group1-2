import ErrorDialog from "@/components/ErrorDialog";
import MyISPOverviewSection from "@/components/isps/MyISPOverviewSection";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useISPShortByStudentGetter } from "@/utils/hooks/useISPShortByStudentGetter";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import Loading from "@/components/Loading";

const TITLE = "your ISP";

export default function StudentISP() {
  const router = useRouter();
  const { studentId } = router.query;
  const id = parseInt(studentId as string);
  
  const { errors, setErrors } = useErrorHandler();
  const { isps } = useISPShortByStudentGetter(id);

  const tabIsActive = Object.keys(errors).length === 0;

  if (isps === null) {
    return <Loading/>
  }

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      {isps && <MyISPOverviewSection isps={isps} isActive={tabIsActive} />}
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
};