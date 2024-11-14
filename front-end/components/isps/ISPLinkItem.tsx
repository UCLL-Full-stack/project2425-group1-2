import React from "react";
import { ISPShort, ISPStatus } from "@/types";
import Link from "next/link";

interface ISPLinkItemProps {
  isp: ISPShort;
  editHref: string;
  viewHref: string;
  isActive: boolean;
};

const ISPLinkItem = React.memo(({
  isp,
  editHref,
  viewHref,
  isActive,
}: ISPLinkItemProps) => {

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
                <p>Status:</p>
                <p>{isp.status}</p>
                </div>
            </article>
            <article className="flex flex-col gap-4 m-2">
              <Link
                className={`p-1 rounded shadow-regular bg-danger ${
                  isActive
                    ? "hover:shadow-success"
                    : "opacity-50 cursor-not-allowed"
                } `}
                href={`${editHref}/${isp.id}`}
              >
                Edit
              </Link>
              <Link
                className={`p-1 rounded shadow-regular bg-indigo-950 ${
                  isActive
                    ? "hover:shadow-success"
                    : "opacity-50 cursor-not-allowed"
                } `}
                href={`${viewHref}/${isp.id}`}
              >
                View
              </Link>
            </article>
          </div>
        </section>
      )}
    </>
  );
});

export default ISPLinkItem;
