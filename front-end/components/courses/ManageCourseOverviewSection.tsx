import React from "react";
import { Course, CourseShort } from "@/types";
import CourseShortEditableItem from "./CourseShortEditableItem";
import CourseDetailedEditableItem from "./CourseDetailedEditableItem";
import { getDefaultCourse } from "@/utils/defaultTypes";

interface ManageCourseOverviewSectionProps {
  courses: Array<CourseShort>;
  isActive: boolean;
  detailedCourses: { [key: number]: Course };
  redactorCourse: (courseId: number) => Promise<void>;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  setCreatingCourse: (course: Course) => void;
}

const ManageCourseOverviewSection = React.memo(({
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
              if (!detailedCoursesDictionary[course.id]) {
                return (
                  <CourseShortEditableItem
                    course={course}
                    redactorCourse={redactorCourse}
                    toggleCourseDetails={toggleCourseDetails}
                    isActive={isActive}
                    key={course.id}
                  />
                );
              }
              return (
                <CourseDetailedEditableItem
                  course={detailedCoursesDictionary[course.id]}
                  redactorCourse={redactorCourse}
                  toggleCourseDetails={toggleCourseDetails}
                  isActive={isActive}
                  key={course.id}
                />
              );
            })}
          </section>
        )}
        <div className="fixed bottom-8 right-8">
          <button
            className="bg-safe hover:shadow-success p-3 rounded shadow-regular"
            onClick={handleCreatingCourse}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
});

export default ManageCourseOverviewSection;
