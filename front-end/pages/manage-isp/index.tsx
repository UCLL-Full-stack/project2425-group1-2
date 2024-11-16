import FixedCreateButton from "@/components/buttons/FixedCreateButton";
import ErrorDialog from "@/components/ErrorDialog";
import ISPForm from "@/components/isps/isp_form/ISPForm";
import ManageISPOverviewSection from "@/components/isps/ManageISPOverviewSection";
import ISPService from "@/services/DummyIspService";
import { CourseShort, ISP } from "@/types";
import { ErrorState } from "@/types/errorState";
import { getDefaultISP } from "@/utils/defaultTypes";
import { useCoursesShortGetter } from "@/utils/hooks/useCoursesShortGetter";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useISPShortGetter } from "@/utils/hooks/useISPShortGetter";
import { mapISPToCreateView, mapISPToUpdateView } from "@/utils/mappers";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage ISP";

export default function ISPManagement() {
  const [updatingISP, setUpdatingISP] = useState<ISP | null>(null);
  const [creatingISP, setCreatingISP] = useState<ISP | null>(null);
  const { errors, setErrors, handleError } = useErrorHandler();
  const { isps, getISPs } = useISPShortGetter(handleError);
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

  const updateISP = async (
    isp: ISP,
    errorCallback?: (error: ErrorState) => void
  ) => {
    const updateISPView = mapISPToUpdateView(isp);
    errorCallback = errorCallback || handleError;
    await ISPService.updateISP(isp.id, updateISPView, errorCallback);
    setUpdatingISP(null);
    await getISPs();
  };

  const createISP = async (isp: ISP) => {
    const createISPView = mapISPToCreateView(isp);
    await ISPService.createISP(createISPView, handleError);
    setCreatingISP(null);
    await getISPs();
  };

  const deleteISP = async (id: number) => {
    await ISPService.deleteISP(id, handleError);
    setUpdatingISP(null);
    await getISPs();
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

  const overviewTabIsActive =
    updatingISP == null &&
    creatingISP == null &&
    Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <h1 className="text-center mt-5">Manage ISP</h1>
      <ManageISPOverviewSection
        isps={isps}
        isActive={overviewTabIsActive}
        redactorISP={handleUpdate}
      />
      <FixedCreateButton
        onClick={handleCreate}
        isActive={overviewTabIsActive}
      />
      <ISPForm
        isp={updatingISP || creatingISP}
        formName={updatingISP ? "Update ISP" : "Create ISP"}
        getPossibleCourses={getPossibleCourses}
        onSubmit={updatingISP ? updateISP : createISP}
        onCancel={
          updatingISP ? () => setUpdatingISP(null) : () => setCreatingISP(null)
        }
        onDelete={updatingISP ? deleteISP : undefined}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
