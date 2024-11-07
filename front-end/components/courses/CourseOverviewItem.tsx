import React from "react";
import { CourseShort } from "@/types";

type Props = {
  course: CourseShort;
  redactorCourse: (courseId: number) => void;
  isActive: boolean;
};

const CourseOverviewItem: React.FC<Props> = ({
  course,
  redactorCourse,
  isActive,
}: Props) => {
  const year = Math.ceil(course.phase / 2);
  const semester = course.phase % 2 === 0 ? 2 : 1;
  return (
    <>
      {course && (
        <article
          className={`bg-primary shadow-regular mb-3`}
        >
          <div className="flex flex-row justify-between p-2">
            <div className="flex flex-row gap-2 items-center">
              <p>{course.name}</p>
              <p>{year} Year</p>
              <p>{semester} Semester</p>
              <p>{course.credits} Credits</p>
            </div>

            <button
              className={`p-1 shadow-regular  bg-danger rounded ${
                isActive ? "hover:shadow-success" : ""
              }`}
              onClick={() => isActive && redactorCourse(course.id)}
              disabled={!isActive}
            >
              Edit
            </button>
          </div>
        </article>
      )}
    </>
  );
};

export default CourseOverviewItem;
