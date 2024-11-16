import ErrorDialog from "@/components/ErrorDialog";
import LowOpacityLayout from "@/components/layouts/LowOpacityLayout";
import MapObjectsLayout from "@/components/layouts/MapObjectsLayout";
import StudentLinkItem from "@/components/users/students/StudentLinkItem";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useStudentsShortGetter } from "@/utils/hooks/useStudentsShortGetter";
import { MY_ISP_URL } from "@/utils/urls";
import Head from "next/head";

const TITLE = "My ISP";
const MAIN_SECTION_TITLE = "Choose student";

export default function MyISP() {
  const { errors, setErrors, handleError } = useErrorHandler();
  const { students } = useStudentsShortGetter(handleError);

  const isActive = Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <LowOpacityLayout isActive={!isActive}>
        <h1 className="text-center mt-5">{MAIN_SECTION_TITLE}</h1>
        <MapObjectsLayout
          objects={students}
          flex="row"
          children={(student) => (
            <StudentLinkItem
              student={student}
              href={`${MY_ISP_URL}/${student.id}`}
              isActive={isActive}
            />
          )}
        />
      </LowOpacityLayout>
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
