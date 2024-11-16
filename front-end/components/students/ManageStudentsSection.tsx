import { Student, UserShort } from "@/types";
import { getDefaultStudent } from "@/utils/defaultTypes";
import FixedCreateButton from "../buttons/FixedCreateButton";
import OverviewLayout from "../layouts/OverviewLayout";
import StudentEditableItem from "./StudentEditableItem";

interface ManageStudentsSectionProps {
  students: UserShort[];
  isActive: boolean;
  redactorStudent: (studentId: number) => Promise<void>;
  setCreatingStudent: (student: Student) => void;
}

const ManageStudentsSection = ({
  students,
  isActive,
  redactorStudent,
  setCreatingStudent,
}: ManageStudentsSectionProps) => {
  const handleCreatingStudent = () => {
    const student: Student = getDefaultStudent();
    setCreatingStudent(student);
  };

  return (
    <>
      <div className={`${isActive ? "" : "opacity-50"}`}>
        <h1 className="text-center mt-5">Manage students</h1>
        {students && (
          <OverviewLayout flex="col">
            {students.map((student, index) => {
              return (
                <div key={index} className="flex">
                  <StudentEditableItem
                    student={student}
                    redactorStudent={redactorStudent}
                    isActive={isActive}
                  />
                </div>
              );
            })}
          </OverviewLayout>
        )}
        <FixedCreateButton
          isActive={isActive}
          onClick={handleCreatingStudent}
        />
      </div>
    </>
  );
};

export default ManageStudentsSection;
