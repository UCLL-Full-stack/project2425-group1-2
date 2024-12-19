import FormLayout from "@/components/forms/FormLayout";
import FormObjectsInput from "@/components/forms/FormObjectsInput";
import { CourseShort, Student } from "@/types";
import { ErrorState } from "@/types/errorState";
import { getDefaultCourse } from "@/utils/defaultTypes";
import { mapCourseShortToString } from "@/utils/mappers";
import { nationalities } from "@/utils/nationalities";
import { validateStudent } from "@/utils/validators";
import React, { useEffect, useMemo, useState } from "react";
import StudentFormButtons from "../../../forms/FormButtons";
import FormInput from "../../../forms/FormInput";
import SelectListInput from "../../../forms/SelectListInput";

interface StudentFormProps {
  student: Student | null;
  formName: string;
  getPossiblePassedCourses: (student: Student) => CourseShort[];
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

    const availablePassedCourses = useMemo(
      () => (formData && getPossiblePassedCourses(formData)) || [],
      [formData?.passedCourses]
    );
    const canAddPassedCourse = useMemo(
      () =>
        availablePassedCourses &&
        availablePassedCourses.length > 0 &&
        !availablePassedCourses.some((p) => p.id === -1),
      [availablePassedCourses, formData?.passedCourses]
    );

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

    const handlePassedCourseChange = (
      index: number,
      availablePassedCourseIndex: number
    ) => {
      const newPassedCourses = [...formData.passedCourses];
      newPassedCourses[index] =
        availablePassedCourses[availablePassedCourseIndex];
      setFormData({
        ...formData,
        passedCourses: newPassedCourses,
      });
    };

    const addEmptyPassedCourse = () => {
      const defaultCourse: CourseShort = getDefaultCourse();
      setFormData({
        ...formData,
        passedCourses: [...formData.passedCourses, defaultCourse],
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
          <FormInput
            name="year"
            labelText="Year"
            inputType="number"
            value={formData.studyYear}
            onChange={handleChange}
            error={errors.year}
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
          <FormObjectsInput
            objects={formData.passedCourses.map(mapCourseShortToString)}
            name="passedCourses"
            labelText="Passed Courses"
            onAdd={addEmptyPassedCourse}
            onRemove={removePassedCourse}
            onChange={handlePassedCourseChange}
            availableObjects={availablePassedCourses.map(
              mapCourseShortToString
            )}
            canAddNewObject={canAddPassedCourse}
            error={errors.passedCourses}
          />
          <StudentFormButtons onCancel={onCancel} onDelete={handleDelete} />
        </FormLayout>
      )
    );
  }
);

export default StudentForm;
