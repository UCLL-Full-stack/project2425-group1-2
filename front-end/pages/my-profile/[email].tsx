import ErrorDialog from "@/components/ErrorDialog";
import FullVerticalLayout from "@/components/layouts/FullVerticalLayout";
import LowOpacityLayout from "@/components/layouts/LowOpacityLayout";
import UserShortView from "@/components/users/UserShortView";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useUserByEmailGetter } from "@/utils/hooks/useUserByEmailGetter";
import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense } from "react";

const TITLE = "your profile";
const MAIN_SECTION_TITLE = "Your Profile";

export default function StudentISP() {
  const router = useRouter();
  const { email } = router.query;
  const userEmail = email as string;

  const { errors, setErrors, handleError } = useErrorHandler();
  const { user } = useUserByEmailGetter(userEmail, handleError);

  const isActive = Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <Suspense fallback={user === null}>
        <LowOpacityLayout isActive={!isActive}>
          <FullVerticalLayout>
            <h1 className="text-center mb-4">{MAIN_SECTION_TITLE}</h1>
            {user && <UserShortView user={user} />}
          </FullVerticalLayout>
        </LowOpacityLayout>
        {errors && Object.keys(errors).length > 0 && (
          <ErrorDialog errors={errors} setErrors={setErrors} />
        )}
      </Suspense>
    </>
  );
}
