import { Course, CourseShort } from "@/types";
import React from "react";
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
    console.log("SelectCourseSection");
    return (
      <>
        <div className={`${isActive ? "" : "opacity-50"}`}>
          <h1 className="text-center mt-5">Select Courses</h1>
          {courses && (
            <section className="ml-4 mr-64 mt-4 flex flex-col">
              {courses.map((course) => {
                return (
                  <CourseSelectableItem
                    course={course}
                    details={detailedCourses[course.id]}
                    selected={isSelected(course.id)}
                    toggleSelectCourse={() => toggleSelectCourse(course)}
                    toggleCourseDetails={toggleCourseDetails}
                    isActive={isActive}
                  />
                );
              })}
            </section>
          )}
          <div className="fixed bottom-8 right-8">
            <button
              className="bg-safe hover:shadow-success p-3 rounded shadow-regular"
              onClick={() => {}}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    );
  }
);

export default SelectCourseSection;
