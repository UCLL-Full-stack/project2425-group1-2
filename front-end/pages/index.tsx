import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import { useEffect, useState } from "react";
import CourseService from "@/services/CourseService";
import { Course, CourseShort } from "@/types";
import CourseManagementOverviewTab from "@/components/courses/CourseManagementOverviewTab";
import UpdateCourseForm from "@/components/courses/UpdateCourseForm";
import ErrorDialog from "@/components/ErrorDialog";
import CreateCourseForm from "@/components/courses/CreateCourseForm";

export default function Home() {
  const [courses, setCourses] = useState<CourseShort[]>([]);
  const [updatingCourse, setUpdatingCourse] = useState<Course | null>(
    null
  );
  const [creatingCourse, setCreatingCourse] = useState<Course | null>(
    null
  );
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
    const data = await CourseService.updateCourse(course.id, course);
    if (!data.ok) {
      const error = await data.json();
      handleError(error);
    }
    setUpdatingCourse(null);
    getCourses();
  };

  const createCourse = async (course: Course) => {
    const data = await CourseService.createCourse(course);
    if (!data.ok) {
      const error = await data.json();
      handleError(error);
    }
    setCreatingCourse(null);
    getCourses();
  }

  const deleteCourse = async (id: number) => {
    const data = await CourseService.deleteCourses([id]);
    if (!data.ok) {
      const error = await data.json();
      handleError(error);
    }
    setUpdatingCourse(null);
    getCourses();
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
        <title>Course Management</title>
        <meta name="description" content="ISP" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="font-poppins text-white font-bold text-sm bg-secondary">
        <Header />
        <main className="min-h-screen">
          <CourseManagementOverviewTab
            courses={courses}
            redactorCourse={redactorCourse}
            isActive={
              updatingCourse == null && Object.keys(errors).length === 0
            }
            setCreatingCourse={setCreatingCourse}
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

        </main>
      </div>
    </>
  );
}