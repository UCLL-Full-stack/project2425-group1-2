import { CourseShort, EntityItem } from "@/types";
import React from "react";
import EditableItem from "../EditableItem";
import CourseShortView from "./CourseShortView";
import CourseDetailsView from "./CourseDetailsView";

interface CourseEditableItemProps {
  course: CourseShort;
  details?: {
    description: string;
    lecturers: string[];
    requiredPassedCourses: EntityItem[];
    isElective: boolean;
  };
  redactorCourse: (courseId: number) => Promise<void>;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  isActive: boolean;
}

const CourseEditableItem = React.memo(
  ({
    course,
    details,
    redactorCourse,
    toggleCourseDetails,
    isActive,
  }: CourseEditableItemProps) => {
    const handleToggleCourseDetails = async () => {
      if (isActive) {
        await toggleCourseDetails(course.id);
      }
    };

    const handleRedactorCourse = async () => {
      await redactorCourse(course.id);
    };

    return (
      <section className="bg-primary shadow-regular mb-3">
        <EditableItem handleEdit={handleRedactorCourse} isActive={isActive}>
          <CourseShortView course={course} />
          <button
            className={`p-1 w-4 h-4 arrow-down border-gray-300`}
            onClick={handleToggleCourseDetails}
            disabled={!isActive}
          ></button>
        </EditableItem>
        {details && <CourseDetailsView details={details} />}
      </section>
    );
  }
);

export default CourseEditableItem;
