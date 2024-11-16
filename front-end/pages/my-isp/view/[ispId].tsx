import FixedBackButton from "@/components/buttons/FixedBackButton";
import CourseItemLayout from "@/components/courses/CourseItemLayout";
import CourseShortView from "@/components/courses/CourseShortView";
import ErrorDialog from "@/components/ErrorDialog";
import MapObjectsLayout from "@/components/layouts/MapObjectsLayout";
import Loading from "@/components/Loading";
import { useDetailedCoursesToggle } from "@/utils/hooks/useDetailedCoursesToggle";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useIspByIdGetter } from "@/utils/hooks/useIspByIdGetter";
import { MY_ISP_URL } from "@/utils/urls";
import Head from "next/head";
import { useRouter } from "next/router";

const TITLE = "Review ISP";

export default function ReviewISP() {
  const router = useRouter();
  const { ispId } = router.query;
  const id = parseInt(ispId as string);

  const { errors, setErrors, handleError } = useErrorHandler();
  const { detailedCourses, toggleCourseDetails } =
    useDetailedCoursesToggle(handleError);
  const { isp } = useIspByIdGetter(id);

  if (!isp) {
    return <Loading />;
  }
  const mainSectionTitle = `ISP ${isp.startYear}-${isp.startYear + 1}`;
  const totalCourseCredits =
    isp.courses.reduce((acc, c) => acc + c.credits, 0) || 0;
  const isActive = Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <h1 className="text-center mt-5">{mainSectionTitle}</h1>
      <MapObjectsLayout
        objects={isp.courses}
        flex="row"
        children={(course) => (
          <CourseItemLayout
            course={course}
            details={detailedCourses[course.id]}
            toggleCourseDetails={toggleCourseDetails}
            isActive={isActive}
          >
            <CourseShortView course={course} />
          </CourseItemLayout>
        )}
      />

      <section className="fixed bottom-8 right-8">
        <article>
          <p>{`${totalCourseCredits}/${isp.totalCredits}`}</p>
        </article>
      </section>

      <FixedBackButton url={MY_ISP_URL} />

      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
