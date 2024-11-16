import { UserShort } from "@/types";
import MapObjectsLayout from "../layouts/MapObjectsLayout";
import StudentLinkItem from "./StudentLinkItem";

interface StudentsLinksSectionProps {
  students: UserShort[];
  isActive: boolean;
  url: string;
}

const StudentsLinksSection = ({
  students,
  isActive,
  url,
}: StudentsLinksSectionProps) => {
  return (
    <MapObjectsLayout
      objects={students}
      flex="row"
      children={(student) => (
        <StudentLinkItem
          student={student}
          href={`${url}/${student.id}`}
          isActive={isActive}
        />
      )}
    />
  );
};

export default StudentsLinksSection;
