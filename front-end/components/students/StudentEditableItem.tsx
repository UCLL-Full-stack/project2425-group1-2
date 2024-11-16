import React from "react";
import { UserShort } from "@/types";
import UserShortView from "./UserShortView";
import EditButton from "../buttons/EditButton";

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
    <section className="p-1 rounded shadow-regular bg-primary align-top text-left w-64 h-64">
      <div className="flex flex-row justify-between p-2">
        <UserShortView user={student} />
        <EditButton handleEdit={handleRedactorStudent} isActive={isActive} />
      </div>
    </section>
  );
};

export default StudentEditableItem;
