import React from "react";
import { ISP, ISPShort } from "@/types";
import { getDefaultISP } from "@/utils/defaultTypes";
import ISPEditableItem from "./ISPEditableItem";

interface ManageISPOverviewSectionProps {
  isps: Array<ISPShort>;
  isActive: boolean;
  redactorISP: (ispId: number) => Promise<void>;
  setCreatingISP: (isp: ISP) => void;
}

const ManageISPOverviewSection = React.memo(({
  isps,
  isActive,
  redactorISP,
  setCreatingISP,
}: ManageISPOverviewSectionProps) => {

  const handleCreatingISP = () => {
    const isp: ISP = getDefaultISP();
    setCreatingISP(isp);
  };

  return (
    <>
      <div className={`${isActive ? "" : "opacity-50"}`}>
        <h1 className="text-center mt-5">Manage isps</h1>
        {isps && (
          <section className="ml-4 mr-80 mt-4 flex flex-col">
            {isps.map((isp) => {
              return (
                <ISPEditableItem
                  isp={isp}
                  redactorISP={redactorISP}
                  isActive={isActive}
                  key={isp.id}
                />
              );
            })}
          </section>
        )}
        <div className="fixed bottom-8 right-8">
          <button
            className="bg-safe hover:shadow-success p-3 rounded shadow-regular"
            onClick={handleCreatingISP}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
});

export default ManageISPOverviewSection;
