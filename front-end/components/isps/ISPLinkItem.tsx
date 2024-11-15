import React from "react";
import { ISPShort, ISPStatus } from "@/types";
import Link from "next/link";
import ISPShortView from "./ISPShortView";

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
        <section className={`${sectionClass} w-full`}>
          <div className="flex flex-row justify-between p-2">
            <ISPShortView isp={isp} />
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
