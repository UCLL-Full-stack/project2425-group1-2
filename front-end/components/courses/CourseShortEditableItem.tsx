import React from "react";
import { CourseShort } from "@/types";

type Props = {
  course: CourseShort;
  redactorCourse: (courseId: number) => Promise<void>;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  isActive: boolean;
};

const CourseShortEditableItem = ({
  course,
  redactorCourse,
  toggleCourseDetails,
  isActive,
}: Props) => {
  const year = Math.ceil(course.phase / 2);
  const semester = course.phase % 2 === 0 ? 2 : 1;

  const handleToggleCourseDetails = async () => {
    if (isActive) {
      await toggleCourseDetails(course.id);
    }
  };

  const handleRedactorCourse = async () => {
    if (isActive) {
      await redactorCourse(course.id);
    }
  };

  return (
    <>
      {course && (
        <section className="bg-primary shadow-regular mb-3">
          <div className="flex flex-row justify-between p-2">
            <article className="flex flex-row gap-2 items-center">
              <p>{course.name}</p>
              <p>{year} Year</p>
              <p>{semester} Semester</p>
              <p>{course.credits} Credits</p>
            </article>
            <article>
              <button
                className={`p-1 w-4 h-4 arrow-down border-gray-300`}
                onClick={handleToggleCourseDetails}
                disabled={!isActive}
              ></button>
              <button
                className={`p-1 shadow-regular  bg-danger rounded ${
                  isActive ? "hover:shadow-success" : ""
                }`}
                onClick={handleRedactorCourse}
                disabled={!isActive}
              >
                Edit
              </button>
            </article>
          </div>
        </section>
      )}
    </>
  );
};

export default CourseShortEditableItem;
