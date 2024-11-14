import React from "react";
import { ISPShort, ISPStatus } from "@/types";

interface ISPEditableItemProps {
  isp: ISPShort;
  redactorISP: (ispId: number) => Promise<void>;
  isActive: boolean;
};

const ISPEditableItem = React.memo(({
  isp,
  redactorISP,
  isActive,
}: ISPEditableItemProps) => {

  const handleRedactorISP = async () => {
    if (isActive) {
      await redactorISP(isp.id);
    }
  };

  const sectionClass = isp.status === ISPStatus.SUBMITTED ? "bg-slate-500 shadow-activated mb-3" : "bg-primary shadow-regular mb-3";

  return (
    <>
      {isp && (
        <section className={sectionClass}>
          <div className="flex flex-row justify-between p-2">
            <article className="flex flex-col gap-2 ml-4">
                <div className="flex flex-row gap-2">
                <p>ISP</p>
                <p>{`${isp.startYear}-${isp.startYear+1}`},</p>
                <p>{isp.totalCredits} credits</p>
                </div>
                <div className="flex flex-row gap-2">
                <p>Student:</p>
                <p>{isp.student.name},</p>
                <p>Status:</p>
                <p>{isp.status}</p>
                </div>
            </article>
            <article>
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
});

export default ISPEditableItem;
