import { UserShort } from "@/types";
import EditButton from "../../buttons/EditButton";
import StudentItemLayout from "./StudentItemLayout";
import UserShortView from "./UserShortView";

interface StudentEditableItemProps {
  student: UserShort;
  redactorStudent: (studentId: number) => Promise<void>;
  isActive: boolean;
}
const StudentEditableItem = ({
  student,
  redactorStudent,
  isActive,
}: StudentEditableItemProps) => {
  const handleRedactorStudent = async () => {
    if (isActive) {
      await redactorStudent(student.id);
    }
  };

  return (
    <StudentItemLayout>
      <UserShortView user={student} />
      <EditButton handleEdit={handleRedactorStudent} isActive={isActive} />
    </StudentItemLayout>
  );
};

export default StudentEditableItem;
