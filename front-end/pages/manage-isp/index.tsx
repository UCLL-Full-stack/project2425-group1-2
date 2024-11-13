import ISPForm from "@/components/isps/isp_form/ISPForm";
import ManageISPOverviewSection from "@/components/isps/ManageISPOverviewSection";
import ErrorDialog from "@/components/ErrorDialog";
import ISPService from "@/services/DummyIspService";
import {
  ISP,
  convertISPToCreateView,
  convertISPToUpdateView
} from "@/types";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import Head from "next/head";
import { useState } from "react";
import { useISPShortGetter } from "@/utils/hooks/useISPShortGetter";
import { ErrorState } from "@/types/errorState";

const TITLE = "Manage ISP";

export default function ISPManagement() {
  const [updatingISP, setUpdatingISP] = useState<ISP | null>(null);
  const [creatingISP, setCreatingISP] = useState<ISP | null>(null);
  const { errors, setErrors, handleError } = useErrorHandler();
  const { isps, getISPs } = useISPShortGetter(handleError);

  const redactorISP = async (id: number) => {
    const updatingIsp: ISP | null = await ISPService.getISPById(id, handleError);
    setUpdatingISP(updatingIsp);
  };

  const updateISP = async (isp: ISP, errorCallback?: (error: ErrorState) => void) => {
    const updateISPView = convertISPToUpdateView(isp);
    errorCallback = errorCallback || handleError;
    await ISPService.updateISP(isp.id, updateISPView, errorCallback);
    setUpdatingISP(null);
    await getISPs();
  };

  const createISP = async (isp: ISP) => {
    const createISPView = convertISPToCreateView(isp);
    await ISPService.createISP(createISPView, handleError);
    setCreatingISP(null);
    await getISPs();
  };

  const deleteISP = async (id: number) => {
    await ISPService.deleteISP(id, handleError);
    setUpdatingISP(null);
    await getISPs();
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
      <ManageISPOverviewSection
        isps={isps}
        isActive={overviewTabIsActive}
        redactorISP={redactorISP}
        setCreatingISP={setCreatingISP}
      />
      <ISPForm
        isp={updatingISP || creatingISP}
        getPossibleRequiredISP={getPossibleRequiredPassedISP}
        onSubmit={updatingISP ? updateISP : createISP}
        onCancel={
          updatingISP
            ? () => setUpdatingISP(null)
            : () => setCreatingISP(null)
        }
        onDelete={updatingISP ? deleteISP : undefined}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
