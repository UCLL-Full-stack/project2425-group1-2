import { Course, CourseShort } from "@/types";
import MapObjectsLayout from "../layouts/MapObjectsLayout";
import CourseSelectableItem from "./CourseSelectableItem";

interface SelectCourseSectionProps {
  courses: CourseShort[];
  isActive: boolean;
  detailedCourses: { [key: number]: Course };
  isSelected: (courseId: number) => boolean;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  toggleSelectCourse: (course: CourseShort) => void;
}

const SelectCourseSection = ({
  courses,
  isActive,
  detailedCourses,
  isSelected,
  toggleSelectCourse,
  toggleCourseDetails,
}: SelectCourseSectionProps) => {
  return (
    <MapObjectsLayout
      objects={courses}
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
  );
};

export default SelectCourseSection;
