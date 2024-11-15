import { Course, CourseShort } from "@/types";
import React from "react";
import OverviewLayout from "../ColumnOverviewLayout";
import CourseSelectableItem from "./CourseSelectableItem";

interface SelectCourseSectionProps {
  courses: CourseShort[];
  isActive: boolean;
  detailedCourses: { [key: number]: Course };
  isSelected: (courseId: number) => boolean;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  toggleSelectCourse: (course: CourseShort) => void;
}

const SelectCourseSection = React.memo(
  ({
    courses,
    isActive,
    detailedCourses,
    isSelected,
    toggleSelectCourse,
    toggleCourseDetails,
  }: SelectCourseSectionProps) => {
    return (
      <>
        <div className={`${isActive ? "" : "opacity-50"}`}>
          <h1 className="text-center mt-5">Select Courses</h1>
          {courses && (
            <OverviewLayout>
              {courses.map((course) => {
                return (
                  <div key={course.id} className="flex flex-col">
                    <CourseSelectableItem
                      course={course}
                      details={detailedCourses[course.id]}
                      selected={isSelected(course.id)}
                      toggleSelectCourse={() => toggleSelectCourse(course)}
                      toggleCourseDetails={toggleCourseDetails}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
            </OverviewLayout>
          )}
        </div>
      </>
    );
  }
);

export default SelectCourseSection;
