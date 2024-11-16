import { Course, CourseShort } from "@/types";
import MapObjectsLayout from "../layouts/MapObjectsLayout";
import CourseEditableItem from "./CourseEditableItem";

interface ManageCourseSectionProps {
  courses: CourseShort[];
  isActive: boolean;
  detailedCourses: { [key: number]: Course };
  redactorCourse: (courseId: number) => Promise<void>;
  toggleCourseDetails: (courseId: number) => Promise<void>;
}

const ManageCourseSection = ({
  courses,
  isActive,
  detailedCourses,
  redactorCourse,
  toggleCourseDetails,
}: ManageCourseSectionProps) => {
  return (
    <MapObjectsLayout
      objects={courses}
      flex="row"
      children={(course) => (
        <CourseEditableItem
          course={course}
          details={detailedCourses[course.id]}
          redactorCourse={redactorCourse}
          toggleCourseDetails={toggleCourseDetails}
          isActive={isActive}
        />
      )}
    />
  );
};

export default ManageCourseSection;
