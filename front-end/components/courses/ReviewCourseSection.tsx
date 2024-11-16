import { Course, CourseShort } from "@/types";
import MapObjectsLayout from "../layouts/MapObjectsLayout";
import CourseItemLayout from "./CourseItemLayout";
import CourseShortView from "./CourseShortView";

interface ReviewCourseSectionProps {
  courses: CourseShort[];
  isActive: boolean;
  detailedCourses: { [key: number]: Course };
  toggleCourseDetails: (courseId: number) => Promise<void>;
}

const ReviewCourseSection = ({
  courses,
  isActive,
  detailedCourses,
  toggleCourseDetails,
}: ReviewCourseSectionProps) => {
  return (
    <MapObjectsLayout
      objects={courses}
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
  );
};

export default ReviewCourseSection;
