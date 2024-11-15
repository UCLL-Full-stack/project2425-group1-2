import { ISPShort } from "@/types";
import { EDIT_URL, MY_ISP_URL, VIEW_URL } from "@/utils/urls";
import React from "react";
import ISPLinkItem from "./ISPLinkItem";

interface MyISPOverviewSectionProps {
  isps: ISPShort[];
  isActive: boolean;
}

const MyISPOverviewSection = React.memo(
  ({ isps, isActive }: MyISPOverviewSectionProps) => {
    return (
      <>
        <div className={`  ${isActive ? "" : "opacity-50"}`}>
          <h1 className="text-center mt-5">My ISP</h1>
          {isps && (
            <section className="m-8 h-auto w-fit max-w-75%w flex flex-col">
              {isps.map((isp) => {
                return (
                  <div key={isp.id} className="flex">
                    <ISPLinkItem
                      isp={isp}
                      editHref={MY_ISP_URL + EDIT_URL}
                      viewHref={MY_ISP_URL + VIEW_URL}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
            </section>
          )}
        </div>
      </>
    );
  }
);

export default MyISPOverviewSection;
