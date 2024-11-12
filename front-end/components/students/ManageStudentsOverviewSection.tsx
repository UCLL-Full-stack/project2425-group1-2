import React from "react";
import { Student, StudentShort } from "@/types";
import StudentEditableItem from "./StudentEditableItem";

interface ManageStudentsOverviewSectionProps {
  students: Array<StudentShort>;
  isActive: boolean;
  redactorStudent: (studentId: number) => Promise<void>;
  setCreatingStudent: (student: Student) => void;
};

const ManageStudentsOverviewSection = ({
  students,
  isActive,
  redactorStudent,
  setCreatingStudent,
}: ManageStudentsOverviewSectionProps) => {

  const handleCreatingStudent = async () => {
    const student: Student = {
      id: -1,
      name: "",
      email: "",
      password: "",
      passedCourses: [],
    };
    setCreatingStudent(student);
  };

  return (
    <>
      <div className={`${isActive ? "" : "opacity-50"}`}>
        <h1 className="text-center mt-5">Manage students</h1>
        {students && (
          <section className="ml-4 mr-64 mt-4 flex flex-row flex-wrap gap-8">
            {students.map((student) => {
              return (
                <StudentEditableItem
                student={student}
                redactorStudent={redactorStudent}
                isActive={isActive}
                key={student.id}
              />
              );
            })}
          </section>
        )}
        <div className="fixed bottom-8 right-8">
          <button
            className="bg-safe hover:shadow-success p-3 rounded shadow-regular"
            onClick={handleCreatingStudent}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageStudentsOverviewSection;
