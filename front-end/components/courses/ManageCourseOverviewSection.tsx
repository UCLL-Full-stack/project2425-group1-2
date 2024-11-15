import { Course, CourseShort } from "@/types";
import { getDefaultCourse } from "@/utils/defaultTypes";
import React from "react";
import CourseEditableItem from "./CourseEditableItem";

interface ManageCourseOverviewSectionProps {
  courses: Array<CourseShort>;
  isActive: boolean;
  detailedCourses: { [key: number]: Course };
  redactorCourse: (courseId: number) => Promise<void>;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  setCreatingCourse: (course: Course) => void;
}

const ManageCourseOverviewSection = React.memo(
  ({
    courses,
    isActive,
    detailedCourses: detailedCoursesDictionary,
    redactorCourse,
    setCreatingCourse,
    toggleCourseDetails,
  }: ManageCourseOverviewSectionProps) => {
    const handleCreatingCourse = () => {
      const course: Course = getDefaultCourse();
      setCreatingCourse(course);
    };

    return (
      <>
        <div className={`${isActive ? "" : "opacity-50"}`}>
          <h1 className="text-center mt-5">Manage courses</h1>
          {courses && (
            <section className="ml-4 mr-64 mt-4 flex flex-col">
              {courses.map((course) => {
                return (
                  <CourseEditableItem
                    course={course}
                    details={detailedCoursesDictionary[course.id]}
                    redactorCourse={redactorCourse}
                    toggleCourseDetails={toggleCourseDetails}
                    isActive={isActive}
                  />
                );
              })}
            </section>
          )}
          <section className="fixed bottom-8 right-8">
            <button
              className="bg-safe hover:shadow-success p-3 rounded shadow-regular"
              onClick={handleCreatingCourse}
            >
              Create
            </button>
          </section>
        </div>
      </>
    );
  }
);

export default ManageCourseOverviewSection;
