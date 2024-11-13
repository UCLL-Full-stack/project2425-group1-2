import React from "react";
import { ISP, ISPShort } from "@/types";

interface ManageISPOverviewSectionProps {
  isps: Array<ISPShort>;
  isActive: boolean;
  redactorISP: (ispId: number) => Promise<void>;
  setCreatingISP: (isp: ISP) => void;
}

const ManageISPOverviewSection = React.memo(({
  isps,
  isActive,
  detailedISPs: detailedISPsDictionary,
  redactorISP,
  setCreatingISP,
  toggleISPDetails,
}: ManageISPOverviewSectionProps) => {
  const handleCreatingISP = async () => {
    const isp: ISP = {
      id: -1,
      name: "",
      description: "",
      phase: 1,
      credits: 1,
      lecturers: [],
      isElective: false,
      requiredPassedISPs: [],
    };
    setCreatingISP(isp);
  };

  return (
    <>
      <div className={`${isActive ? "" : "opacity-50"}`}>
        <h1 className="text-center mt-5">Manage isps</h1>
        {isps && (
          <section className="ml-4 mr-64 mt-4 flex flex-col">
            {isps.map((isp) => {
              if (!detailedISPsDictionary[isp.id]) {
                return (
                  <ISPShortEditableItem
                    isp={isp}
                    redactorISP={redactorISP}
                    toggleISPDetails={toggleISPDetails}
                    isActive={isActive}
                    key={isp.id}
                  />
                );
              }
              return (
                <ISPDetailedEditableItem
                  isp={detailedISPsDictionary[isp.id]}
                  redactorISP={redactorISP}
                  toggleISPDetails={toggleISPDetails}
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
