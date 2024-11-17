import { Student } from "@/types";
import React from "react";
import CourseShortView from "../courses/CourseShortView";

interface StudentDetailsViewProps {
  user: Student;
}

const StudentDetailsView = React.memo(({ user }: StudentDetailsViewProps) => {
  return (
    <article className="flex flex-col gap-2 items-center">
      <p>{`Nationality: ${user.nationality}`}</p>
      <p>{`Study year: ${user.year}`}</p>
      <p>{`Passed courses:`}</p>
      {user.passedCourses.map((course) => (
        <CourseShortView course={course} />
      ))}
    </article>
  );
});

export default StudentDetailsView;
