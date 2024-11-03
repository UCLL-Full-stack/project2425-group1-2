import React from "react";
import { Course, CourseShort } from "@/types";
import CourseOverviewItem from "./CourseOverviewItem";

type Props = {
  courses: Array<CourseShort>;
  redactorCourse: (courseId: number) => void;
  isActive: boolean;
  setCreatingCourse: (course: Course) => void;
};

const CourseManagementOverviewTab: React.FC<Props> = ({
  courses,
  redactorCourse,
  isActive,
  setCreatingCourse,
}: Props) => {
  return (
    <>
      <div className={`${isActive ? "" : "opacity-50"}`}>
        <h1 className="text-center mt-5">Manage courses</h1>
        {courses && (
          <section className="ml-4 mr-44 mt-4 flex flex-col">
            {courses.map((course) =>
              CourseOverviewItem({ course, redactorCourse, isActive })
            )}
          </section>
        )}
        <div className="fixed bottom-4 right-4">
          <button
            className="bg-safe hover:shadow-success p-2 rounded shadow-regular"
            onClick={() =>
              setCreatingCourse({
                id: 0,
                name: "",
                description: "",
                phase: 1,
                credits: 1,
                lecturers: [],
                isElective: false,
                requiredPassedCourses: [],
              })
            }
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseManagementOverviewTab;
