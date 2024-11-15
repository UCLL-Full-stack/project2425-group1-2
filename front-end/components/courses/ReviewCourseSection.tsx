import { Course, CourseShort } from "@/types";
import React from "react";
import CourseItemLayout from "./CourseItemLayout";
import CourseShortView from "./CourseShortView";

interface ReviewCourseSectionProps {
  courses: CourseShort[];
  isActive: boolean;
  detailedCourses: { [key: number]: Course };
  toggleCourseDetails: (courseId: number) => Promise<void>;
}

const ReviewCourseSection = React.memo(
  ({
    courses,
    isActive,
    detailedCourses,
    toggleCourseDetails,
  }: ReviewCourseSectionProps) => {
    return (
      <>
        <div className={`${isActive ? "" : "opacity-50"}`}>
          <h1 className="text-center mt-5">Review Courses</h1>
          {courses && (
            <section className="m-8 h-auto w-fit max-w-75%w flex flex-col">
              {courses.map((course) => {
                return (
                  <CourseItemLayout
                    course={course}
                    details={detailedCourses[course.id]}
                    toggleCourseDetails={toggleCourseDetails}
                    isActive={isActive}
                  >
                    <CourseShortView course={course} />
                  </CourseItemLayout>
                );
              })}
            </section>
          )}
        </div>
      </>
    );
  }
);

export default ReviewCourseSection;
