import FixedBackButton from "@/components/buttons/FixedBackButton";
import SaveUndoButtons from "@/components/buttons/SaveUndoButtons";
import CourseSelectableItem from "@/components/courses/CourseSelectableItem";
import ErrorDialog from "@/components/ErrorDialog";
import ISPSubmitNotification from "@/components/isps/ISPSubmitNotification";
import ManageObjectsLayout from "@/components/layouts/ManageObjectsLayout";
import Loading from "@/components/Loading";
import DummyIspService from "@/services/DummyIspService";
import { CourseShort, ISPStatus } from "@/types";
import { useCoursesForStudentGetter } from "@/utils/hooks/useCoursesForStudentGetter";
import { useDetailedCoursesToggle } from "@/utils/hooks/useDetailedCoursesToggle";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useIspByIdGetter } from "@/utils/hooks/useIspByIdGetter";
import { MY_ISP_URL } from "@/utils/urls";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const TITLE = "Compose ISP";

export default function ComposeISP() {
  const router = useRouter();
  const { ispId } = router.query;
  const id = parseInt(ispId as string);

  const { errors, setErrors, handleError } = useErrorHandler();
  const { detailedCourses, toggleCourseDetails } =
    useDetailedCoursesToggle(handleError);
  const { isp, setIsp } = useIspByIdGetter(id);
  const { courses } = useCoursesForStudentGetter(isp ? isp.student.id : 0);
  const [changes, setChanges] = useState<
    { course: CourseShort; selected: boolean }[]
  >([]);

  const selectedCourses = useMemo(() => {
    return (
      isp?.courses.reduce((acc, c) => {
        acc[c.id] = true;
        return acc;
      }, {} as { [key: number]: boolean }) || {}
    );
  }, [isp?.courses]);

  const totalCourseCredits = useMemo(() => {
    return isp?.courses.reduce((acc, c) => acc + c.credits, 0) || 0;
  }, [isp?.courses]);

  const isSelected = (courseId: number) => {
    return !!selectedCourses[courseId];
  };

  const calculateLowestCreditsUnselected = () => {
    const res = courses.reduce((acc, c) => {
      if (!isSelected(c.id)) {
        return Math.min(acc, c.credits);
      }
      return acc;
    }, Infinity);
    return res === Infinity ? 0 : res;
  };

  const lowestCreditsUnselected = useMemo(calculateLowestCreditsUnselected, [
    courses,
    selectedCourses,
  ]);

  const submittable = useMemo(() => {
    if (!isp) {
      return false;
    }
    return (
      (lowestCreditsUnselected === 0 ||
        totalCourseCredits + lowestCreditsUnselected > isp.totalCredits) &&
      totalCourseCredits <= isp.totalCredits
    );
  }, [totalCourseCredits, isp?.totalCredits, lowestCreditsUnselected]);

  if (!isp) {
    return <Loading />;
  }
  if (isp.status === ISPStatus.SUBMITTED) {
    return <ISPSubmitNotification id={isp.id} />;
  }

  const mainSectionTitle = `ISP ${isp.startYear}-${isp.startYear + 1}`;
  const isActive = Object.keys(errors).length === 0;

  const updateISPByStudentId = async (
    id: number,
    ispData: { status: ISPStatus; courses: number[] }
  ) => {
    const isp = await DummyIspService.updateISPByStudentId(
      id,
      ispData,
      handleError
    );
    return isp;
  };

  const toggleSelectCourse = async (course: CourseShort) => {
    let newCourses = [...isp.courses];
    const selected = isSelected(course.id);
    if (selected) {
      newCourses = newCourses.filter((c) => c.id !== course.id);
    } else {
      newCourses.push(course);
    }
    isp.courses = newCourses;
    setIsp(isp);
    registerChangeCourses(course, !selected);
  };

  const registerChangeCourses = async (
    course: CourseShort,
    selected: boolean
  ) => {
    setChanges([...changes, { course, selected }]);
  };

  const undoLastChange = async () => {
    const lastChange = changes.pop();
    if (lastChange) {
      toggleSelectCourse(lastChange.course);
    }
    setChanges([...changes]);
  };

  const handleSave = async () => {
    await updateISPByStudentId(id, {
      status: isp.status,
      courses: isp.courses.map((c) => c.id),
    });
    setChanges([]);
  };

  const handleSubmit = async () => {
    if (!submittable || isp.status === ISPStatus.SUBMITTED) {
      return;
    }
    isp.status = ISPStatus.SUBMITTED;
    setIsp(isp);
    await handleSave();
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <ManageObjectsLayout
        objects={courses}
        isActive={isActive}
        headingTitle={mainSectionTitle}
        flex="col"
        children={(course) => (
          <CourseSelectableItem
            course={course}
            details={detailedCourses[course.id]}
            selected={isSelected(course.id)}
            toggleSelectCourse={() => toggleSelectCourse(course)}
            toggleCourseDetails={toggleCourseDetails}
            isActive={isActive}
          />
        )}
      />
      <section className="fixed bottom-6 right-8 flex flex-row gap-2">
        {changes.length > 0 && (
          <SaveUndoButtons onSave={handleSave} onUndo={undoLastChange} />
        )}
        <section className="flex flex-col items-center gap-2">
          <article className={`${submittable ? "" : "text-red-800"}`}>
            <p>{`${totalCourseCredits}/${isp.totalCredits}`}</p>
          </article>
          <button
            className={`p-3 rounded shadow-regular ${
              submittable ? "bg-success hover:shadow-safe" : "bg-gray-500"
            }`}
            onClick={handleSubmit}
            disabled={!submittable}
          >
            Submit
          </button>
        </section>
      </section>

      <FixedBackButton url={MY_ISP_URL} />

      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
