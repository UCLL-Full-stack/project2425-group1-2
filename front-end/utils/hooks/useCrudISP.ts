import DummyIspService from "@/services/DummyIspService";
import { ISP, ISPShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";
import { mapISPToCreateView, mapISPToUpdateView } from "../mappers";

export const useCrudISP = (errorCallback?: (error: ErrorState) => void) => {
  const [isps, setISPs] = useState<ISPShort[]>([]);

  const getISPs = async () => {
    const newIsp: ISPShort[] = await DummyIspService.getAllISPShort(
      errorCallback
    );
    setISPs(newIsp);
  };

  const updateISP = async (
    isp: ISP,
    handleError?: (error: ErrorState) => void
  ) => {
    const updateISPView = mapISPToUpdateView(isp);
    errorCallback = handleError || errorCallback;
    await DummyIspService.updateISP(isp.id, updateISPView, errorCallback);
    await getISPs();
  };

  const createISP = async (isp: ISP) => {
    const createISPView = mapISPToCreateView(isp);
    await DummyIspService.createISP(createISPView, errorCallback);
    await getISPs();
  };

  const deleteISP = async (id: number) => {
    await DummyIspService.deleteISP(id, errorCallback);
    await getISPs();
  };
  
  useEffect(() => {
    getISPs();
  }, []);

  return {
    isps,
    setISPs,
    getISPs,
    updateISP,
    createISP,
    deleteISP,
  };
};
