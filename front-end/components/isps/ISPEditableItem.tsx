import React from "react";
import { ISPShort, ISPStatus } from "@/types";
import ISPShortView from "./ISPShortView";

interface ISPEditableItemProps {
  isp: ISPShort;
  redactorISP: (ispId: number) => Promise<void>;
  isActive: boolean;
}

const ISPEditableItem = React.memo(
  ({ isp, redactorISP, isActive }: ISPEditableItemProps) => {
    const handleRedactorISP = async () => {
      if (isActive) {
        await redactorISP(isp.id);
      }
    };

    const sectionClass =
      isp.status === ISPStatus.SUBMITTED
        ? "bg-slate-500 shadow-activated mb-3"
        : "bg-primary shadow-regular mb-3";

    return (
      <>
        {isp && (
          <section className={sectionClass}>
            <div className="flex flex-row justify-between p-4">
              <ISPShortView isp={isp} />
              <article className="ml-8">
                <button
                  className={`p-1 shadow-regular  bg-danger rounded ${
                    isActive ? "hover:shadow-success" : ""
                  }`}
                  onClick={handleRedactorISP}
                  disabled={!isActive}
                >
                  Edit
                </button>
              </article>
            </div>
          </section>
        )}
      </>
    );
  }
);

export default ISPEditableItem;
