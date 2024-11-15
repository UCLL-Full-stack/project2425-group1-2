import { Course, CourseShort } from "@/types";
import React from "react";
import OverviewLayout from "../ColumnOverviewLayout";
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
            <OverviewLayout>
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
            </OverviewLayout>
          )}
        </div>
      </>
    );
  }
);

export default ReviewCourseSection;
