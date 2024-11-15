import CourseForm from "@/components/courses/course_form/CourseForm";
import ManageCourseOverviewSection from "@/components/courses/ManageCourseSection";
import ErrorDialog from "@/components/ErrorDialog";
import CourseService from "@/services/CourseService";
import { Course, EntityItem } from "@/types";
import { useCoursesShortGetter } from "@/utils/hooks/useCoursesShortGetter";
import { useDetailedCoursesToggle } from "@/utils/hooks/useDetailedCoursesToggle";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import {
  mapCourseShortToEntityItem,
  mapCourseToUpdateView,
} from "@/utils/mappers";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage Courses";

export default function CourseManagement() {
  const [updatingCourse, setUpdatingCourse] = useState<Course | null>(null);
  const [creatingCourse, setCreatingCourse] = useState<Course | null>(null);
  const { errors, setErrors, handleError } = useErrorHandler();
  const { courses, getCourses } = useCoursesShortGetter(handleError);
  const { detailedCourses, toggleCourseDetails } =
    useDetailedCoursesToggle(handleError);

  const redactorCourse = async (id: number) => {
    const course: Course = await CourseService.getCourseById(id, handleError);
    setUpdatingCourse(course);
  };

  const updateCourse = async (course: Course) => {
    const updateCourseView = mapCourseToUpdateView(course);
    await CourseService.updateCourse(course.id, updateCourseView, handleError);
    setUpdatingCourse(null);
    await getCourses();
  };

  const createCourse = async (course: Course) => {
    const updateCourseView = mapCourseToUpdateView(course);
    await CourseService.createCourse(updateCourseView, handleError);
    setCreatingCourse(null);
    await getCourses();
  };

  const deleteCourse = async (id: number) => {
    await CourseService.deleteCourses([id], handleError);
    setUpdatingCourse(null);
    await getCourses();
  };

  const getPossibleRequiredPassedCourses = (course: Course): EntityItem[] => {
    return courses
      .filter(
        (c) =>
          c.id !== course.id &&
          c.phase < course.phase &&
          course.requiredPassedCourses.findIndex((r) => r.id === c.id) === -1
      )
      .map(mapCourseShortToEntityItem);
  };

  const overviewTabIsActive =
    updatingCourse == null &&
    creatingCourse == null &&
    Object.keys(errors).length === 0;

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
