import FixedCreateButton from "@/components/buttons/FixedCreateButton";
import CourseForm from "@/components/courses/course_form/CourseForm";
import CourseEditableItem from "@/components/courses/CourseEditableItem";
import ErrorDialog from "@/components/ErrorDialog";
import ObjectsWithHeadingLayout from "@/components/layouts/ObjectsWithHeadingLayout";
import CourseService from "@/services/CourseService";
import { Course, EntityItem } from "@/types";
import { getDefaultCourse } from "@/utils/defaultTypes";
import { useCrudCourse } from "@/utils/hooks/useCrudCourse";
import { useDetailedCoursesToggle } from "@/utils/hooks/useDetailedCoursesToggle";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { mapCourseShortToEntityItem } from "@/utils/mappers";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage Courses";
const MAIN_SECTION_TITLE = "Manage courses";

export default function CourseManagement() {
  const [updatingCourse, setUpdatingCourse] = useState<Course | null>(null);
  const [creatingCourse, setCreatingCourse] = useState<Course | null>(null);
  const { errors, setErrors, handleError } = useErrorHandler();
  const { courses, createCourse, updateCourse, deleteCourse } =
    useCrudCourse(handleError);
  const { detailedCourses, toggleCourseDetails } =
    useDetailedCoursesToggle(handleError);

  const handleUpdate = async (id: number) => {
    const course: Course = await CourseService.getCourseById(id, handleError);
    setUpdatingCourse(course);
  };

  const handleCreate = () => {
    const course: Course = getDefaultCourse();
    setCreatingCourse(course);
  };

  const handleSubmit = async (isp: Course) => {
    if (updatingCourse) {
      await updateCourse(isp);
      setUpdatingCourse(null);
      return;
    }
    await createCourse(isp);
    setCreatingCourse(null);
    return;
  };

  const handleCancel = () => {
    setCreatingCourse(null);
    setUpdatingCourse(null);
  };

  const handleDelete = async (id: number) => {
    await deleteCourse(id);
    setUpdatingCourse(null);
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

  const manageTabIsActive =
    updatingCourse == null &&
    creatingCourse == null &&
    Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <ObjectsWithHeadingLayout
        objects={courses}
        isActive={manageTabIsActive}
        headingTitle={MAIN_SECTION_TITLE}
        flex="col"
        children={(course) => (
          <CourseEditableItem
            course={course}
            details={detailedCourses[course.id]}
            redactorCourse={handleUpdate}
            toggleCourseDetails={toggleCourseDetails}
            isActive={manageTabIsActive}
          />
        )}
      />
      <FixedCreateButton onClick={handleCreate} isActive={manageTabIsActive} />
      <CourseForm
        course={updatingCourse || creatingCourse}
        formName={updatingCourse ? "Update Course" : "Create Course"}
        getPossibleRequiredCourses={getPossibleRequiredPassedCourses}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onDelete={updatingCourse ? handleDelete : undefined}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
