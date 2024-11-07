import CourseManagementOverviewTab from "@/components/courses/CourseManagementOverviewSection";
import CreateCourseForm from "@/components/courses/CreateCourseForm";
import UpdateCourseForm from "@/components/courses/UpdateCourseForm";
import ErrorDialog from "@/components/ErrorDialog";
import CourseService from "@/services/CourseService";
import { Course, CourseShort, convertCourseToUpdateView } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const TITLE = "Course Management";

export default function CourseManagement() {
  const [courses, setCourses] = useState<CourseShort[]>([]);
  const [updatingCourse, setUpdatingCourse] = useState<Course | null>(null);
  const [creatingCourse, setCreatingCourse] = useState<Course | null>(null);
  const [detailedCourses, setDetailedCourses] = useState<{ [key: number]: Course }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getCourses = async () => {
    const data = await CourseService.getAllShortCourses();
    const courses = await data.json();
    setCourses(courses);
  };

  const redactorCourse = async (id: number) => {
    const data = await CourseService.getCourseById(id);
    const course = await data.json();
    setUpdatingCourse(course);
  };

  const updateCourse = async (course: Course) => {
    const updateCourseView = convertCourseToUpdateView(course);
    const data = await CourseService.updateCourse(course.id, updateCourseView);
    if (!data.ok) {
      const error = await data.json();
      handleError(error);
    }
    setUpdatingCourse(null);
    getCourses();
  };

  const createCourse = async (course: Course) => {
    const updateCourseView = convertCourseToUpdateView(course);
    const data = await CourseService.createCourse(updateCourseView);
    if (!data.ok) {
      const error = await data.json();
      handleError(error);
    }
    setCreatingCourse(null);
    getCourses();
  };

  const deleteCourse = async (id: number) => {
    const data = await CourseService.deleteCourses([id])
    if (!data.ok) {
      const error = await data.json();
      handleError(error);
    }
    setUpdatingCourse(null);
    getCourses();
  };
  
  const toggleCourseDetails = async (courseId: number) => {
    if (detailedCourses[courseId]) {
      const newCourses = { ...detailedCourses };
      delete newCourses[courseId];
      setDetailedCourses(newCourses);
    } else {
      const data = await CourseService.getCourseById(courseId);
      const course = await data.json();
      setDetailedCourses({ ...detailedCourses, [courseId]: course });
    }
  }

  const handleError = (error: {}) => {
    const newErrors: { [key: string]: string } = {};
    if (error) {
      Object.entries(error).forEach(([key, value]) => {
        newErrors[key] = value as string;
      });
    }
    setErrors(newErrors);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <CourseManagementOverviewTab
        courses={courses}
        isActive={updatingCourse == null && Object.keys(errors).length === 0}
        detailedCourses={detailedCourses}
        redactorCourse={redactorCourse}
        setCreatingCourse={setCreatingCourse}
        toggleCourseDetails={toggleCourseDetails}
      />
      <UpdateCourseForm
        course={updatingCourse}
        onUpdate={updateCourse}
        onDelete={deleteCourse}
        onClose={() => setUpdatingCourse(null)}
      />
      <CreateCourseForm
        course={creatingCourse}
        onCreate={createCourse}
        onClose={() => setCreatingCourse(null)}
      />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
