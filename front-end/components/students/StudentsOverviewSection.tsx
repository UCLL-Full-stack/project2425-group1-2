import React from "react";
import { Student, StudentShort } from "@/types";
import StudentEditableItem from "./StudentEditableItem";
import StudentLinkItem from "./StudentLinkItem";

interface StudentsOverviewSectionProps {
  students: Array<StudentShort>;
  isActive: boolean;
  url: string;
};

const StudentsOverviewSection = ({
  students,
  isActive,
  url,
}: StudentsOverviewSectionProps) => {

  return (
    <>
      <div className={`${isActive ? "" : "opacity-50"}`}>
        <h1 className="text-center mt-5">Choose a student</h1>
        {students && (
          <section className="ml-4 mr-64 mt-4 flex flex-row flex-wrap gap-8">
            {students.map((student) => {
              return (
                <StudentLinkItem
                student={student}
                href={`${url}/${student.id}`}
                isActive={isActive}
              />
              );
            })}
          </section>
        )}
      </div>
    </>
  );
};

export default StudentsOverviewSection;
