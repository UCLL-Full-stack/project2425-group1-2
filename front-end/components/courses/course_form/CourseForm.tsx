import { Course } from "@/types";
import React, { useEffect, useState } from "react";
import CourseFormButtons from "./CourseFormButtons";
import CourseFormInput from "./CourseFormInput";
import CourseLecturersInput from "./CourseLecturersInput";
import CourseRequiredCoursesInput from "./CourseRequiredCoursesInput";

type Props = {
  course: Course | null;
  getPossibleRequiredCourses: (
    course: Course
  ) => { id: number; name: string }[];
  onSubmit: (course: Course) => Promise<void>;
  onCancel: () => void;
  onDelete?: (id: number) => Promise<void>;
};

const CourseForm: React.FC<Props> = ({
  course,
  getPossibleRequiredCourses,
  onSubmit,
  onCancel,
  onDelete,
}) => {
  const [formData, setFormData] = useState(course);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setErrors({});
    setFormData(course);
  }, [course]);

  if (!formData) {
    return null;
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Course name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (formData.phase <= 0)
      newErrors.phase = "Phase must be a positive number.";
    if (formData.credits <= 0)
      newErrors.credits = "Credits must be a positive number.";
    if (formData.lecturers && formData.lecturers.some((l) => l === ""))
      newErrors.lecturers = "Lecturers must be filled.";
    if (
      formData.requiredPassedCourses &&
      formData.requiredPassedCourses.some((c) => c.id === -1)
    )
      newErrors.requiredPassedCourses = "Required courses must be chosen.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async () => {
    if (course && onDelete) {
      await onDelete(course.id);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhaseChange = (value: number) => {
    let newFormData = { ...formData, phase: value };
    if (value < formData.phase) {
      newFormData.requiredPassedCourses = [];
    }
    setFormData(newFormData);
  };

  const toggleElective = () => {
    setFormData({ ...formData, isElective: !formData.isElective });
  };

  const handleLecturerChange = (index: number, value: string) => {
    const newLecturers = [...formData.lecturers];
    newLecturers[index] = value;
    setFormData({ ...formData, lecturers: newLecturers });
  };

  const addEmptyLecturer = () => {
    setFormData({ ...formData, lecturers: [...formData.lecturers, ""] });
  };

  const removeLecturer = (index: number) => {
    const newLecturers = formData.lecturers.filter((_, i) => i !== index);
    setFormData({ ...formData, lecturers: newLecturers });
  };

  const handleRequiredPassedCourseChange = (
    index: number,
    value: { id: number; name: string }
  ) => {
    const newRequiredPassedCourses = [...formData.requiredPassedCourses];
    newRequiredPassedCourses[index] = value;
    setFormData({
      ...formData,
      requiredPassedCourses: newRequiredPassedCourses,
    });
  };

  const addEmptyRequiredPassedCourse = () => {
    setFormData({
      ...formData,
      requiredPassedCourses: [
        ...formData.requiredPassedCourses,
        { id: -1, name: "" },
      ],
    });
  };

  const removeRequiredPassedCourse = (index: number) => {
    const newRequiredPassedCourses = formData.requiredPassedCourses.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      requiredPassedCourses: newRequiredPassedCourses,
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
        <div className="bg-primary pl-4 rounded-lg min-w-160 w-2/5 h-85% shadow-regular mb-10 relative">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 overflow-y-auto max-h-full pr-4 pb-6"
          >
            <h2 className="text-2xl mb-4 text-center mt-4">Update Course</h2>
            <CourseFormInput
              name="name"
              labelText="Course Name"
              inputType="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <CourseFormInput
              name="description"
              labelText="Description"
              inputType="textarea"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />
            <CourseFormInput
              name="phase"
              labelText="Phase"
              inputType="number"
              value={formData.phase}
              onChange={(e) => handlePhaseChange(parseInt(e.target.value))}
              error={errors.phase}
            />
            <CourseFormInput
              name="credits"
              labelText="Credits"
              inputType="number"
              value={formData.credits}
              onChange={handleChange}
              error={errors.credits}
            />
            <CourseLecturersInput
              lecturers={formData.lecturers}
              onAdd={addEmptyLecturer}
              onRemove={removeLecturer}
              onChange={handleLecturerChange}
              error={errors.lecturers}
            />
            <CourseFormInput
              name="isElective"
              labelText="Elective"
              inputType="checkbox"
              checked={formData.isElective}
              onChange={toggleElective}
            />
            <CourseRequiredCoursesInput
              requiredPassedCourses={formData.requiredPassedCourses}
              onAdd={addEmptyRequiredPassedCourse}
              onRemove={removeRequiredPassedCourse}
              onChange={handleRequiredPassedCourseChange}
              getPossibleRequiredCourses={getPossibleRequiredCourses}
              formData={formData}
              error={errors.requiredPassedCourses}
            />
            <CourseFormButtons onCancel={onCancel} onDelete={handleDelete} />
          </form>
        </div>
      </div>
    )
  );
};

export default CourseForm;
