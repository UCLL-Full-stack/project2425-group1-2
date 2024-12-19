import FixedCreateButton from "@/components/buttons/FixedCreateButton";
import CourseForm from "@/components/courses/course_form/CourseForm";
import CourseEditableItem from "@/components/courses/CourseEditableItem";
import ErrorDialog from "@/components/ErrorDialog";
import ObjectsWithHeadingLayout from "@/components/layouts/ObjectsWithHeadingLayout";
import CourseService from "@/services/CourseService";
import { Course, EntityItem, PrivilegeType } from "@/types";
import { getDefaultCourse } from "@/utils/defaultTypes";
import { useCrudCourse } from "@/utils/hooks/useCrudCourse";
import { useDetailedCoursesToggle } from "@/utils/hooks/useDetailedCoursesToggle";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { usePrivilegeVerifier } from "@/utils/hooks/usePrivilegeVerifier";
import { mapCourseShortToEntityItem } from "@/utils/mappers";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage Courses";
const MAIN_SECTION_TITLE = "Manage courses";

export default function ManageCourses() {
  const [updatingCourse, setUpdatingCourse] = useState<Course | null>(null);
  const [creatingCourse, setCreatingCourse] = useState<Course | null>(null);
  const { errors, setErrors, handleError } = useErrorHandler();
  const { courses, createCourse, updateCourse, deleteCourse } =
    useCrudCourse(handleError);
  const { detailedCourses, toggleCourseDetails } =
    useDetailedCoursesToggle(handleError);
  const { verifyPrivilege } = usePrivilegeVerifier(handleError);

  const handleUpdate = async (id: number) => {
    const course: Course = await CourseService.getCourseById(id, handleError);
    setUpdatingCourse(course);
  };

  const handleCreate = () => {
    const course: Course = getDefaultCourse();
    setCreatingCourse(course);
  };

  const handleSubmit = async (isp: Course) => {
    updatingCourse ? await update(isp) : await create(isp);
  };

  const update = async (course: Course) => {
    const verified = await verifyPrivilege(PrivilegeType.UPDATE_COURSE);
    if (!verified) {
      return;
    }
    await updateCourse(course);
    setUpdatingCourse(null);
  };

  const create = async (course: Course) => {
    const verified = await verifyPrivilege(PrivilegeType.CREATE_COURSE);
    if (!verified) {
      return;
    }
    await createCourse(course);
    setCreatingCourse(null);
  };

  const handleCancel = () => {
    setCreatingCourse(null);
    setUpdatingCourse(null);
  };

  const handleDelete = async (id: number) => {
    const verified = await verifyPrivilege(PrivilegeType.DELETE_COURSE);
    if (!verified) {
      return;
    }
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
      {courses && courses.length && (
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
      )}

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
