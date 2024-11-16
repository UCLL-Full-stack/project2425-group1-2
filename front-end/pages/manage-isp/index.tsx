import FixedCreateButton from "@/components/buttons/FixedCreateButton";
import ErrorDialog from "@/components/ErrorDialog";
import ISPForm from "@/components/isps/isp_form/ISPForm";
import ISPEditableItem from "@/components/isps/ISPEditableItem";
import MapObjectsLayout from "@/components/layouts/MapObjectsLayout";
import ISPService from "@/services/DummyIspService";
import { CourseShort, ISP } from "@/types";
import { getDefaultISP } from "@/utils/defaultTypes";
import { useCoursesShortGetter } from "@/utils/hooks/useCoursesShortGetter";
import { useCrudISP } from "@/utils/hooks/useCrudISP";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage ISP";
const MAIN_SECTION_TITLE = "Manage ISP";

export default function ISPManagement() {
  const [updatingISP, setUpdatingISP] = useState<ISP | null>(null);
  const [creatingISP, setCreatingISP] = useState<ISP | null>(null);
  const { errors, setErrors, handleError } = useErrorHandler();
  const { isps, createISP, updateISP, deleteISP } = useCrudISP(handleError);
  const { courses } = useCoursesShortGetter(handleError);

  const handleUpdate = async (id: number) => {
    const updatingIsp: ISP | null = await ISPService.getISPById(
      id,
      handleError
    );
    setUpdatingISP(updatingIsp);
  };

  const handleCreate = () => {
    const isp: ISP = getDefaultISP();
    setCreatingISP(isp);
  };

  const handleSubmit = async (isp: ISP) => {
    if (updatingISP) {
      await updateISP(isp);
      setUpdatingISP(null);
      return;
    }
    await createISP(isp);
    setCreatingISP(null);
    return;
  };

  const handleCancel = () => {
    setCreatingISP(null);
    setUpdatingISP(null);
  };

  const handleDelete = async (id: number) => {
    await deleteISP(id);
    setUpdatingISP(null);
  };

  const getPossibleCourses = (isp: ISP): CourseShort[] => {
    if (!isp || !courses) {
      return [];
    }
    if (!isp.courses) {
      return courses;
    }
    return courses.filter(
      (course) => !isp.courses.find((c) => c.id === course.id)
    );
  };

  const ManageTabisActive =
    updatingISP == null &&
    creatingISP == null &&
    Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <h1 className="text-center mt-5">{MAIN_SECTION_TITLE}</h1>
      <MapObjectsLayout
        objects={isps}
        flex="col"
        children={(isp) => (
          <ISPEditableItem
            isp={isp}
            redactorISP={handleUpdate}
            isActive={ManageTabisActive}
          />
        )}
      />
      <FixedCreateButton onClick={handleCreate} isActive={ManageTabisActive} />
      <ISPForm
        isp={updatingISP || creatingISP}
        formName={updatingISP ? "Update ISP" : "Create ISP"}
        getPossibleCourses={getPossibleCourses}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onDelete={updatingISP ? handleDelete : undefined}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
