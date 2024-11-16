import { ISPShort } from "@/types";
import MapObjectsLayout from "../layouts/MapObjectsLayout";
import ISPEditableItem from "./ISPEditableItem";

interface ManageISPOverviewSectionProps {
  isps: ISPShort[];
  isActive: boolean;
  redactorISP: (ispId: number) => Promise<void>;
}

const ManageISPOverviewSection = ({
  isps,
  isActive,
  redactorISP,
}: ManageISPOverviewSectionProps) => {
  return (
    <MapObjectsLayout
      objects={isps}
      flex="row"
      children={(isp) => (
        <ISPEditableItem
          isp={isp}
          redactorISP={redactorISP}
          isActive={isActive}
        />
      )}
    />
  );
};

export default ManageISPOverviewSection;
