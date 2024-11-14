import FormLayout from "@/components/forms/FormLayout";
import { EntityItem, Student } from "@/types";
import { ErrorState } from "@/types/errorState";
import { nationalities } from "@/utils/nationalities";
import { validateStudent } from "@/utils/validators";
import React, { useEffect, useState } from "react";
import StudentFormButtons from "../../forms/FormButtons";
import FormInput from "../../forms/FormInput";
import SelectListInput from "../../forms/SelectListInput";
import StudentPassedCoursesInput from "./StudentPassedCoursesInput";

interface StudentFormProps {
  student: Student | null;
  formName: string;
  getPossiblePassedCourses: (student: Student) => EntityItem[];
  onSubmit: (student: Student) => Promise<void>;
  onCancel: () => void;
  onDelete?: (id: number) => Promise<void>;
}

const StudentForm = React.memo(
  ({
    student,
    formName,
    getPossiblePassedCourses,
    onSubmit,
    onCancel,
    onDelete,
  }: StudentFormProps) => {
    const [formData, setFormData] = useState(student);
    const [errors, setErrors] = useState<ErrorState>({});

    useEffect(() => {
      setErrors({});
      setFormData(student);
    }, [student]);

    if (!formData) {
      return null;
    }

    const handleDelete = async () => {
      if (student && onDelete) {
        await onDelete(student.id);
      }
    };

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      let { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handlePassedCourseChange = (index: number, value: EntityItem) => {
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
      if (!validateStudent(formData, setErrors)) {
        return;
      }
      await onSubmit(formData);
    };

    return (
      formData && (
        <FormLayout formName={formName} onSubmit={handleSubmit}>
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
          <SelectListInput<string>
            value={formData.nationality}
            labelText="Nationality"
            name="nationality"
            defaultValue="Select nationality"
            values={nationalities}
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
        </FormLayout>
      )
    );
  }
);

export default StudentForm;
