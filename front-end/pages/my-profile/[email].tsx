import { useAuth } from "@/components/AuthProvider";
import LogoutButton from "@/components/buttons/LogoutButton";
import ErrorDialog from "@/components/ErrorDialog";
import FullVerticalLayout from "@/components/layouts/FullVerticalLayout";
import LowOpacityLayout from "@/components/layouts/LowOpacityLayout";
import AdminDetailsView from "@/components/users/AdminDetailsView";
import StudentDetailsView from "@/components/users/StudentDetailsView";
import UserFullView from "@/components/users/UserFullView";
import { Administrative, Role, Student } from "@/types";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useUserByEmailGetter } from "@/utils/hooks/useUserByEmailGetter";
import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense } from "react";

const TITLE = "your profile";
const MAIN_SECTION_TITLE = "Your Profile";

export default function MyProfile() {
  const router = useRouter();
  const { email } = router.query;
  const userEmail = email as string;
  const auth = useAuth();

  const { errors, setErrors, handleError } = useErrorHandler();
  const { user } = useUserByEmailGetter(userEmail, handleError);

  const isActive = Object.keys(errors).length === 0;

  const handleLogout = async () => {
    if (auth) {
      auth.logout();
    }
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <Suspense fallback={user === null}>
        <LowOpacityLayout isActive={!isActive}>
          <FullVerticalLayout>
            <h1 className="text-center mb-4">{MAIN_SECTION_TITLE}</h1>
            {user !== undefined && (
              <>
                <div className="flex flex-col gap-2 items-start">
                  <UserFullView user={user} />
                  {user.role === Role.STUDENT && (
                    <StudentDetailsView user={user as Student} />
                  )}
                  {user.role === Role.ADMIN && (
                    <AdminDetailsView user={user as Administrative} />
                  )}
                </div>
                <section className="text-center">
                  <LogoutButton isActive={isActive} onClick={handleLogout} />
                </section>
              </>
            )}
          </FullVerticalLayout>
        </LowOpacityLayout>
        {errors && Object.keys(errors).length > 0 && (
          <ErrorDialog errors={errors} setErrors={setErrors} />
        )}
      </Suspense>
    </>
  );
}
