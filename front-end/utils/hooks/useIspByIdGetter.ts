import DummyIspService from "@/services/DummyIspService";
import { ISP } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useIspByIdGetter = (
  ispId: number,
  errorCallback?: (error: ErrorState) => void
) => {

  const [isp, setIsp] = useState<ISP | null>();

  const getIspById = async (id: number) => {
    const isp = await DummyIspService.getISPById(id, errorCallback);
    setIsp(isp);
  };

  useEffect(() => {
    getIspById(ispId);
  }, [ispId]);

  return { isp, setIsp, getIspById};
};
