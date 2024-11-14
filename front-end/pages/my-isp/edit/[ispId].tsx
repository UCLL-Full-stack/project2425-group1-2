import CourseForm from "@/components/courses/course_form/CourseForm";
import ManageCourseOverviewSection from "@/components/courses/ManageCourseOverviewSection";
import ErrorDialog from "@/components/ErrorDialog";
import CourseService from "@/services/CourseService";
import { Course } from "@/types";
import { useCoursesShortGetter } from "@/utils/hooks/useCoursesShortGetter";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage Courses";

export default function CourseManagement() {
  const [updatingCourse, setUpdatingCourse] = useState<Course | null>(null);
  const [creatingCourse, setCreatingCourse] = useState<Course | null>(null);
  const [detailedCourses, setDetailedCourses] = useState<{
    [key: number]: Course;
  }>({});
  const { errors, setErrors, handleError } = useErrorHandler();
  const { courses, getCourses } = useCoursesShortGetter(handleError);

  const toggleCourseDetails = async (courseId: number) => {
    if (detailedCourses[courseId]) {
      const newCourses = { ...detailedCourses };
      delete newCourses[courseId];
      setDetailedCourses(newCourses);
    } else {
      const course: Course = await CourseService.getCourseById(
        courseId,
        handleError
      );
      setDetailedCourses({ ...detailedCourses, [courseId]: course });
    }
  };

  const tabIsActive = Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <ManageCourseOverviewSection
        courses={courses}
        isActive={overviewTabIsActive}
        detailedCourses={detailedCourses}
        redactorCourse={redactorCourse}
        setCreatingCourse={setCreatingCourse}
        toggleCourseDetails={toggleCourseDetails}
      />
      <CourseForm
        course={updatingCourse || creatingCourse}
        formName={updatingCourse ? "Update Course" : "Create Course"}
        getPossibleRequiredCourses={getPossibleRequiredPassedCourses}
        onSubmit={updatingCourse ? updateCourse : createCourse}
        onCancel={
          updatingCourse
            ? () => setUpdatingCourse(null)
            : () => setCreatingCourse(null)
        }
        onDelete={updatingCourse ? deleteCourse : undefined}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
