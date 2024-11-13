import React from "react";
import { UserShort } from "@/types";

interface StudentEditableItemProps {
  student: UserShort;
  redactorStudent: (studentId: number) => Promise<void>;
  isActive: boolean;
};
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
    <>
      {student && (
        <section className="p-1 rounded shadow-regular bg-primary align-top text-left w-64 h-64" >
          <div className="flex flex-row justify-between p-2">
            <article className="flex flex-col gap-2 items-center">
              <p>{`Id: ${student.id}`}</p>
              <p>{student.name}</p>
            </article>
            <article>
              <button
                className={`p-1 shadow-regular bg-danger rounded ${
                  isActive ? "hover:shadow-success" : ""
                }`}
                onClick={handleRedactorStudent}
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
};

export default StudentEditableItem;
