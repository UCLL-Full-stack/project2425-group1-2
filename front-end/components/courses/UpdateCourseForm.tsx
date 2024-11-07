import { Course } from "@/types";
import React from "react";
import CourseForm from "./CourseForm";

type Props = {
  course: Course | null;
  onClose: () => void;
  onUpdate: (updatedCourse: Course) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

const UpdateCourseForm: React.FC<Props> = ({ course, onClose, onUpdate, onDelete }) => {
  const handleDelete = async () => {
    if (course) {
      await onDelete(course.id);
    }
  };

  return (
    <CourseForm course={course} onSubmit={onUpdate}>
      <div className="flex items-center space-x-2 mt-4">
        <button
          type="submit"
          className="flex-1 bg-safe hover:shadow-success font-semibold py-2 rounded shadow-regular"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-alter hover:shadow-success font-semibold py-2 rounded shadow-regular"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="flex-1 bg-danger hover:shadow-success font-semibold py-2 rounded shadow-regular"
        >
          Delete
        </button>
      </div>
    </CourseForm>
  );
};

export default UpdateCourseForm;
