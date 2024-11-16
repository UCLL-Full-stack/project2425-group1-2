import ErrorDialog from "@/components/ErrorDialog";
import Loading from "@/components/Loading";
import ISPLinkItem from "@/components/isps/ISPLinkItem";
import ManageObjectsLayout from "@/components/layouts/ManageObjectsLayout";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useISPShortByStudentGetter } from "@/utils/hooks/useISPShortByStudentGetter";
import { EDIT_URL, MY_ISP_URL, VIEW_URL } from "@/utils/urls";
import Head from "next/head";
import { useRouter } from "next/router";

const TITLE = "your ISP";
const MAIN_SECTION_TITLE = "Your ISP";

export default function StudentISP() {
  const router = useRouter();
  const { studentId } = router.query;
  const id = parseInt(studentId as string);

  const { errors, setErrors } = useErrorHandler();
  const { isps } = useISPShortByStudentGetter(id);

  const isActive = Object.keys(errors).length === 0;

  if (isps === null) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <ManageObjectsLayout
        objects={isps}
        isActive={isActive}
        headingTitle={MAIN_SECTION_TITLE}
        flex="col"
        children={(isp) => (
          <ISPLinkItem
            isp={isp}
            editHref={MY_ISP_URL + EDIT_URL}
            viewHref={MY_ISP_URL + VIEW_URL}
            isActive={isActive}
          />
        )}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
