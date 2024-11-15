import { CourseShort, EntityItem } from "@/types";
import React from "react";
import CourseDetailsView from "./CourseDetailsView";

interface CourseEditableItemProps {
  course: CourseShort;
  details?: {
    description: string;
    lecturers: string[];
    requiredPassedCourses: EntityItem[];
    isElective: boolean;
  };
  toggleCourseDetails: (courseId: number) => Promise<void>;
  isActive: boolean;
  children: React.ReactNode;
}

const CourseItemLayout = React.memo(
  ({
    course,
    details,
    toggleCourseDetails,
    isActive,
    children,
  }: CourseEditableItemProps) => {
    const handleToggleCourseDetails = async () => {
      if (isActive) {
        await toggleCourseDetails(course.id);
      }
    };

    return (
      <section className="bg-primary shadow-regular mb-3">
        <section className="flex flex-row justify-between p-4">
          <article className="flex flex-row gap-4">{children}</article>
          <article className="flexjustify-self-end">
            <button
              className={`p-1 w-8 h-8 ${
                details ? "arrow-up" : "arrow-down"
              } border-gray-300 self-center`}
              onClick={handleToggleCourseDetails}
              disabled={!isActive}
            ></button>
          </article>
        </section>
        {details && <CourseDetailsView details={details} />}
      </section>
    );
  }
);

export default CourseItemLayout;
