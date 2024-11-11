import { Course } from "@/types";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  course: Course | null;
  children: ReactNode;
  onSubmit: (course: Course) => Promise<void>;
};

const CourseForm: React.FC<Props> = ({ children, course, onSubmit }) => {
  const [formData, setFormData] = useState(course);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setErrors({});
    setFormData(course);
  }, [course]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData) {
      return false;
    }
    if (!formData.name) newErrors.name = "Course name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (formData.phase <= 0)
      newErrors.phase = "Phase must be a positive number.";
    if (formData.credits <= 0)
      newErrors.credits = "Credits must be a positive number.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value, type } = e.target;
    if (!formData) {
      return;
    }
    if (type === "checkbox" && name === "isElective") {
      setFormData({ ...formData, isElective: !formData.isElective });
      return;
    }
    if (name === "lecturers") {
      setFormData({
        ...formData,
        lecturers: value.split(", ").map((l) => l.trim()),
      });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !validate()) {
      return;
    }
    await onSubmit(formData);
  };

  return (
    formData && (
      <div className="fixed inset-0 flex items-center justify-center z-50 mt-10">
        <div className="bg-primary pl-4 rounded-lg w-11/12 max-w-lg shadow-regular relative">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 overflow-y-auto h-112 pr-4 pb-6"
          >
            <h2 className="text-2xl mb-4 text-center mt-4">Update Course</h2>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm mb-1">
                Course Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm mb-1">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <label htmlFor="phase" className="text-sm mb-1">
                Phase
              </label>
              <input
                type="number"
                name="phase"
                id="phase"
                value={formData.phase}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
              {errors.phase && (
                <p className="text-red-500 text-xs mt-1">{errors.phase}</p>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="credits" className="text-sm mb-1">
                Credits
              </label>
              <input
                type="number"
                name="credits"
                id="credits"
                value={formData.credits}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
              {errors.credits && (
                <p className="text-red-500 text-xs mt-1">{errors.credits}</p>
              )}
            </div>
            <div className="flex-1 flex flex-col">
            <label htmlFor="lecturers" className="text-sm mb-1">
                Lectureres
              </label>
              <input
                type="text"
                name="lecturers"
                id="lecturers"
                value={formData.lecturers.join(", ")}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
              {errors.lecturers && (
                <p className="text-red-500 text-xs mt-1">{errors.lecturers}</p>
              )}
            </div>
            <div className="flex-1 flex flex-row gap-2">
              <label htmlFor="isElective" className="text-sm mb-1">
                Elective
              </label>
              <input
                type="checkbox"
                name="isElective"
                id="isElective"
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 checked:bg-success text-alter  focus:ring-offset-0 focus:ring-0"
              />
              {errors.isElective && (
                <p className="text-red-500 text-xs mt-1">{errors.isElective}</p>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="requiredPassedCourses" className="text-sm mb-1">
                Required Courses
              </label>
              <input
                type="requiredPassedCourses"
                name="requiredPassedCourses"
                id="requiredPassedCourses"
                value={formData.requiredPassedCourses
                  .map((c) => c.name)
                  .join(", ")}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
              {errors.requiredPassedCourses && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.requiredPassedCourses}
                </p>
              )}
            </div>
            {children}
          </form>
        </div>
      </div>
    )
  );
};

export default CourseForm;
