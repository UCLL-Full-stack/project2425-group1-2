import ISPService from "@/services/DummyIspService";
import { ISPShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useISPShortGetter = (
  errorCallback?: (error: ErrorState) => void
) => {

  const [isps, setISPs] = useState<ISPShort[]>([]);

  const getISPs = async () => {
    const newIsp: ISPShort[] = await ISPService.getAllISPShort(
      errorCallback
    );
    setISPs(newIsp);
  };

  useEffect(() => {
    getISPs();
  }, []);

  return { isps, setISP: setISPs, getISPs };
};
