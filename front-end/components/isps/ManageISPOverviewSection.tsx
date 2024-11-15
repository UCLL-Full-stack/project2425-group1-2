import { ISP, ISPShort } from "@/types";
import { getDefaultISP } from "@/utils/defaultTypes";
import React from "react";
import ISPEditableItem from "./ISPEditableItem";
import OverviewLayout from "../ColumnOverviewLayout";

interface ManageISPOverviewSectionProps {
  isps: ISPShort[];
  isActive: boolean;
  redactorISP: (ispId: number) => Promise<void>;
  setCreatingISP: (isp: ISP) => void;
}

const ManageISPOverviewSection = React.memo(
  ({
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
          <h1 className="text-center mt-5">Manage ISP</h1>
          {isps && (
            <OverviewLayout>
              {isps.map((isp) => {
                return (
                  <div key={isp.id} className="flex">
                    <ISPEditableItem
                      isp={isp}
                      redactorISP={redactorISP}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
            </OverviewLayout>
          )}
          <section className="fixed bottom-8 right-8">
            <button
              className="bg-safe hover:shadow-success p-3 rounded shadow-regular"
              onClick={handleCreatingISP}
            >
              Create
            </button>
          </section>
        </div>
      </>
    );
  }
);

export default ManageISPOverviewSection;
