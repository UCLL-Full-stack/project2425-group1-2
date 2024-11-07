import { Course } from "@/types";
import React from "react";
import CourseForm from "./CourseForm";

type Props = {
  course: Course | null;
  onClose: () => void;
  onCreate: (updatedCourse: Course) => Promise<void>;
};

const CreateCourseForm: React.FC<Props> = ({ course, onClose, onCreate }) => {

  return (
          <CourseForm course={course} onSubmit={onCreate}>
            <div className="flex items-center space-x-2 mt-4">
              <button
                type="submit"
                className="flex-1 bg-safe hover:shadow-success font-semibold py-2 rounded shadow-regular"
              >
                Create
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-danger hover:shadow-success font-semibold py-2 rounded shadow-regular"
              >
                Cancel
              </button>
            </div>
          </CourseForm>

    
  );
};

export default CreateCourseForm;
