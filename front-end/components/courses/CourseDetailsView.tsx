import { CourseShort, EntityItem } from "@/types";
import React from "react";

interface CourseDetailsViewProps {
  details: {
    description: string;
    lecturers: string[];
    requiredPassedCourses: EntityItem[];
    isElective: boolean;
  };
}

const CourseDetailsView = React.memo(({ details }: CourseDetailsViewProps) => {
  return (
    <section className="flex flex-col gap-4 p-4">
      <p>{details.description}</p>
      <p>
        Taught by:{" "}
        {!details.lecturers || details.lecturers.length > 0
          ? details.lecturers.join(", ")
          : "No lecturers"}
      </p>
      {!details.requiredPassedCourses ||
        (details.requiredPassedCourses.length > 0 && (
          <p>
            Required Courses:{" "}
            {details.requiredPassedCourses
              .map((details) => details.name)
              .join(", ")}
          </p>
        ))}
      {details.isElective && <p>Elective</p>}
    </section>
  );
});

export default CourseDetailsView;
