import React from "react";
import { Course } from "@/types";

type Props = {
  course: Course;
  redactorCourse: (courseId: number) => Promise<void>;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  isActive: boolean;
};

const CourseDetailedEditableItem: React.FC<Props> = ({
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
        <section className={`bg-primary shadow-regular mb-3`}>
          <div className="flex flex-row justify-between p-2">
            <section className="flex flex-row gap-2 items-center">
              <p>{course.name}</p>
              <p>{year} Year</p>
              <p>{semester} Semester</p>
              <p>{course.credits} Credits</p>
            </section>
            <article>
              <button
                className={`p-1 w-4 h-4 arrow-up border-gray-300`}
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
          <section className="flex flex-col gap-2 p-2">
            <p>{course.description}</p>
            <p>
              Taught by:{" "}
              {course.lecturers.length > 0 ? course.lecturers.join(", ") : "No lecturers"}
            </p>
            {course.requiredPassedCourses.length > 0 && (
              <p>
                Required Courses:{" "}
                {course.requiredPassedCourses.map((course) => course.name).join(", ")}
              </p>
            )}
            {course.isElective && <p>Elective</p>}
          </section>
        </section>
      )}
    </>
  );
};

export default CourseDetailedEditableItem;
