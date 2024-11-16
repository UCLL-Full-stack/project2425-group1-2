import ReviewCourseSection from "@/components/courses/ReviewCourseSection";
import ErrorDialog from "@/components/ErrorDialog";
import Loading from "@/components/Loading";
import { useCoursesShortGetter } from "@/utils/hooks/useCoursesShortGetter";
import { useDetailedCoursesToggle } from "@/utils/hooks/useDetailedCoursesToggle";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useIspByIdGetter } from "@/utils/hooks/useIspByIdGetter";
import { MY_ISP_URL } from "@/utils/urls";
import Head from "next/head";
import Link from "next/link";
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
  const totalCourseCredits =
    isp.courses.reduce((acc, c) => acc + c.credits, 0) || 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <h1 className="text-center mt-5">Review ISP</h1>
      <ReviewCourseSection
        courses={isp.courses}
        isActive={Object.keys(errors).length === 0}
        detailedCourses={detailedCourses}
        toggleCourseDetails={toggleCourseDetails}
      />

      <section className="fixed bottom-8 right-8 flex flex-row gap-2">
        <article>
          <p>{`${totalCourseCredits}/${isp.totalCredits}`}</p>
        </article>
      </section>

      <section className="fixed bottom-10 left-8  ">
        <Link
          href={MY_ISP_URL + `/${isp.student.id}`}
          className={
            "hover:shadow-success rounded shadow-regular bg-indigo-950 p-3"
          }
        >
          My ISP
        </Link>
      </section>

      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
