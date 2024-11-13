import ErrorDialog from "@/components/ErrorDialog";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import Head from "next/head";

const TITLE = "Payments";

export default function ProfileManagement() {
  const { errors, setErrors } = useErrorHandler();

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
