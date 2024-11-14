import { CourseShort, EntityItem } from "@/types";
import React from "react";
import SelectableItem from "../SelectableItem";
import CourseShortView from "./CourseShortView";
import CourseDetailsView from "./CourseDetailsView";

interface CourseSelectableItemProps {
  course: CourseShort;
  selected: boolean;
  details?: {
    description: string;
    lecturers: string[];
    requiredPassedCourses: EntityItem[];
    isElective: boolean;
  };
  toggleSelectCourse: () => void;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  isActive: boolean;
}

const CourseSelectableItem = React.memo(
  ({
    course,
    selected,
    details,
    toggleSelectCourse,
    toggleCourseDetails,
    isActive,
  }: CourseSelectableItemProps) => {
    const handleToggleCourseDetails = async () => {
      if (isActive) {
        await toggleCourseDetails(course.id);
      }
    };

    return (
      <section className="bg-primary shadow-regular mb-3">
        <SelectableItem
          toggleSelect={toggleSelectCourse}
          isActive={isActive}
          selected={selected}
        >
          <CourseShortView course={course} />
          <article>
            <button
              className={`p-1 w-4 h-4 arrow-down border-gray-300`}
              onClick={handleToggleCourseDetails}
              disabled={!isActive}
            ></button>
          </article>
        </SelectableItem>
        {details && <CourseDetailsView details={details} />}
      </section>
    );
  }
);

export default CourseSelectableItem;
