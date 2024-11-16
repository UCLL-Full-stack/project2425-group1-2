import { CourseShort, EntityItem } from "@/types";
import React from "react";
import EditableItem from "../items/EditableItem";
import CourseShortView from "./CourseShortView";
import CourseDetailsView from "./CourseDetailsView";
import CourseItemLayout from "./CourseItemLayout";

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
    const handleRedactorCourse = async () => {
      await redactorCourse(course.id);
    };

    return (
      <CourseItemLayout
        course={course}
        details={details}
        toggleCourseDetails={toggleCourseDetails}
        isActive={isActive}
      >
        <EditableItem handleEdit={handleRedactorCourse} isActive={isActive} />
        <CourseShortView course={course} />
      </CourseItemLayout>
    );
  }
);

export default CourseEditableItem;
