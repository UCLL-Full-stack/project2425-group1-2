import { Course } from "@/types";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  course: Course | null;
  children: ReactNode;
  onSubmit: (course: Course) => Promise<void>;
};

const CourseForm: React.FC<Props> = ({ children, course, onSubmit}) => {
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
    const { name, value } = e.target;
    if (!formData) {
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
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-primary p-6 rounded-lg w-11/12 max-w-lg shadow-regular relative">
          <h2 className="text-2xl mb-4 text-center">Update Course</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            {children}
          </form>
        </div>
      </div>
    )
  );
};

export default CourseForm;
