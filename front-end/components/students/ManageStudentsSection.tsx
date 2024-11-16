import { UserShort } from "@/types";
import MapObjectsLayout from "../layouts/MapObjectsLayout";
import StudentEditableItem from "./StudentEditableItem";

interface ManageStudentsSectionProps {
  students: UserShort[];
  isActive: boolean;
  redactorStudent: (studentId: number) => Promise<void>;
}

const ManageStudentsSection = ({
  students,
  isActive,
  redactorStudent,
}: ManageStudentsSectionProps) => {
  return (
    <MapObjectsLayout
      objects={students}
      flex="row"
      children={(student) => (
        <StudentEditableItem
          student={student}
          redactorStudent={redactorStudent}
          isActive={isActive}
        />
      )}
    />
  );
};

export default ManageStudentsSection;
