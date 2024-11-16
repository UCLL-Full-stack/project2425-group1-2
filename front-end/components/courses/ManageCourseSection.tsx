import { Course, CourseShort } from "@/types";
import { getDefaultCourse } from "@/utils/defaultTypes";
import React from "react";
import CourseEditableItem from "./CourseEditableItem";
import RectangleLayout from "../OverviewLayout";
import OverviewLayout from "../OverviewLayout";

interface ManageCourseSectionProps {
  courses: Array<CourseShort>;
  isActive: boolean;
  detailedCourses: { [key: number]: Course };
  redactorCourse: (courseId: number) => Promise<void>;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  setCreatingCourse: (course: Course) => void;
}

const ManageCourseSection = React.memo(
  ({
    courses,
    isActive,
    detailedCourses: detailedCoursesDictionary,
    redactorCourse,
    setCreatingCourse,
    toggleCourseDetails,
  }: ManageCourseSectionProps) => {
    const handleCreatingCourse = () => {
      const course: Course = getDefaultCourse();
      setCreatingCourse(course);
    };

    return (
      <>
        <div className={`${isActive ? "" : "opacity-50"}`}>
          <h1 className="text-center mt-5">Manage courses</h1>
          {courses && (
            <OverviewLayout flex="col">
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
            </OverviewLayout>
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

export default ManageCourseSection;
