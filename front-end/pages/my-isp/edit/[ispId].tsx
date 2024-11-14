import SelectCourseSection from "@/components/courses/SelectCourseSection";
import ErrorDialog from "@/components/ErrorDialog";
import { useCoursesShortGetter } from "@/utils/hooks/useCoursesShortGetter";
import { useDetailedCoursesToggle } from "@/utils/hooks/useDetailedCoursesToggle";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import Head from "next/head";

const TITLE = "Compose ISP";

export default function ComposeISP() {
  const { errors, setErrors, handleError } = useErrorHandler();
  const { detailedCourses, toggleCourseDetails } =
    useDetailedCoursesToggle(handleError);
  const { courses, getCourses } = useCoursesShortGetter(handleError);

  const tabIsActive = Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <SelectCourseSection
        courses={courses}
        isActive={tabIsActive}
        detailedCourses={detailedCourses}
        isSelected={() => false}
        toggleSelectCourse={() => {}}
        toggleCourseDetails={toggleCourseDetails}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
