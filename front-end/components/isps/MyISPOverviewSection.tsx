import { ISPShort } from "@/types";
import { EDIT_URL, MY_ISP_URL, VIEW_URL } from "@/utils/urls";
import MapObjectsLayout from "../layouts/MapObjectsLayout";
import ISPLinkItem from "./ISPLinkItem";

interface MyISPOverviewSectionProps {
  isps: ISPShort[];
  isActive: boolean;
}

const MyISPOverviewSection = ({
  isps,
  isActive,
}: MyISPOverviewSectionProps) => {
  return (
    <MapObjectsLayout
      objects={isps}
      flex="col"
      children={(isp) => (
        <ISPLinkItem
          isp={isp}
          editHref={MY_ISP_URL + EDIT_URL}
          viewHref={MY_ISP_URL + VIEW_URL}
          isActive={isActive}
        />
      )}
    />
  );
};

export default MyISPOverviewSection;
