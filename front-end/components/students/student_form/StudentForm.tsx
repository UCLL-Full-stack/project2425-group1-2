import { CourseItem, Student } from "@/types";
import React, { useEffect, useState } from "react";
import StudentFormButtons from "../../forms/FormButtons";
import FormInput from "../../forms/FormInput";
import StudentPassedCoursesInput from "./StudentPassedCoursesInput";
import StudentNationalityInput from "./StudentNationalityInput";
import { ErrorState } from "@/types/errorState";

interface StudentFormProps {
  student: Student | null;
  getPossiblePassedCourses: (
    student: Student
  ) => CourseItem[];
  onSubmit: (student: Student) => Promise<void>;
  onCancel: () => void;
  onDelete?: (id: number) => Promise<void>;
}

const StudentForm = React.memo(({
  student,
  getPossiblePassedCourses,
  onSubmit,
  onCancel,
  onDelete,
}: StudentFormProps) => {
  const [formData, setFormData] = useState(student);
  const [errors, setErrors] = useState<ErrorState>({});

  useEffect(() => {
    setErrors({});
  }, [student]);

  if (!formData) {
    return null;
  }

  const validate = () => {
    const newErrors: ErrorState = {};
    if (!formData.name) newErrors.name = "Student name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (
      formData.passedCourses &&
      formData.passedCourses.some((c) => c.id === -1)
    )
      newErrors.passedCourses = "Passed courses must be chosen.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async () => {
    if (student && onDelete) {
      await onDelete(student.id);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePassedCourseChange = (
    index: number,
    value: CourseItem
  ) => {
    const newPassedCourses = [...formData.passedCourses];
    newPassedCourses[index] = value;
    setFormData({
      ...formData,
      passedCourses: newPassedCourses,
    });
  };

  const addEmptyPassedCourse = () => {
    setFormData({
      ...formData,
      passedCourses: [...formData.passedCourses, { id: -1, name: "" }],
    });
  };

  const removePassedCourse = (index: number) => {
    const newPassedCourses = formData.passedCourses.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      passedCourses: newPassedCourses,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    await onSubmit(formData);
  };

  return (
    formData && (
      <div className="fixed inset-0 flex items-center justify-center z-50 mt-28">
        <div className="bg-primary pl-4 rounded-lg min-w-160 w-2/5 h-5/6 shadow-regular mb-10 relative">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 overflow-y-auto max-h-full pr-4 pb-6"
          >
            <h2 className="text-2xl mb-4 text-center mt-4">Update Student</h2>
            <FormInput
              name="name"
              labelText="Student Name"
              inputType="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FormInput
              name="email"
              labelText="Email"
              inputType="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <FormInput
              name="password"
              labelText="Password"
              inputType="text"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <StudentNationalityInput
              nationality={formData.nationality}
              onChange={handleChange}
              error={errors.nationality}
            />
            <StudentPassedCoursesInput
              passedCourses={formData.passedCourses}
              onAdd={addEmptyPassedCourse}
              onRemove={removePassedCourse}
              onChange={handlePassedCourseChange}
              getPossiblePassedCourses={() => getPossiblePassedCourses(formData)}
              error={errors.passedCourses}
            />
            <StudentFormButtons onCancel={onCancel} onDelete={handleDelete} />
          </form>
        </div>
      </div>
    )
  );
});

export default StudentForm;
