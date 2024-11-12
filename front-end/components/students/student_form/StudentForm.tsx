import { Student } from "@/types";
import React, { useEffect, useState } from "react";
import StudentFormButtons from "../../forms/FormButtons";
import StudentFormInput from "./StudentFormInput";
import StudentLecturersInput from "./StudentLecturersInput";
import StudentRequiredStudentsInput from "./StudentRequiredStudentsInput";

interface StudentFormProps {
  student: Student | null;
  getPossibleRequiredStudents: (
    student: Student
  ) => { id: number; name: string }[];
  onSubmit: (student: Student) => Promise<void>;
  onCancel: () => void;
  onDelete?: (id: number) => Promise<void>;
};

const StudentForm = ({
  student,
  getPossibleRequiredStudents,
  onSubmit,
  onCancel,
  onDelete,
}: StudentFormProps) => {
  const [formData, setFormData] = useState(student);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setErrors({});
    setFormData(student);
  }, [student]);

  if (!formData) {
    return null;
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Student name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (formData.phase <= 0)
      newErrors.phase = "Phase must be a positive number.";
    if (formData.credits <= 0)
      newErrors.credits = "Credits must be a positive number.";
    if (formData.lecturers && formData.lecturers.some((l) => l === ""))
      newErrors.lecturers = "Lecturers must be filled.";
    if (
      formData.requiredPassedStudents &&
      formData.requiredPassedStudents.some((c) => c.id === -1)
    )
      newErrors.requiredPassedStudents = "Required students must be chosen.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async () => {
    if (student && onDelete) {
      await onDelete(student.id);
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
      newFormData.requiredPassedStudents = [];
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

  const handleRequiredPassedStudentChange = (
    index: number,
    value: { id: number; name: string }
  ) => {
    const newRequiredPassedStudents = [...formData.requiredPassedStudents];
    newRequiredPassedStudents[index] = value;
    setFormData({
      ...formData,
      requiredPassedStudents: newRequiredPassedStudents,
    });
  };

  const addEmptyRequiredPassedStudent = () => {
    setFormData({
      ...formData,
      requiredPassedStudents: [
        ...formData.requiredPassedStudents,
        { id: -1, name: "" },
      ],
    });
  };

  const removeRequiredPassedStudent = (index: number) => {
    const newRequiredPassedStudents = formData.requiredPassedStudents.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      requiredPassedStudents: newRequiredPassedStudents,
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
            <h2 className="text-2xl mb-4 text-center mt-4">Update Student</h2>
            <StudentFormInput
              name="name"
              labelText="Student Name"
              inputType="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <StudentFormInput
              name="description"
              labelText="Description"
              inputType="textarea"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />
            <StudentFormInput
              name="phase"
              labelText="Phase"
              inputType="number"
              value={formData.phase}
              onChange={(e) => handlePhaseChange(parseInt(e.target.value))}
              error={errors.phase}
            />
            <StudentFormInput
              name="credits"
              labelText="Credits"
              inputType="number"
              value={formData.credits}
              onChange={handleChange}
              error={errors.credits}
            />
            <StudentLecturersInput
              lecturers={formData.lecturers}
              onAdd={addEmptyLecturer}
              onRemove={removeLecturer}
              onChange={handleLecturerChange}
              error={errors.lecturers}
            />
            <StudentFormInput
              name="isElective"
              labelText="Elective"
              inputType="checkbox"
              checked={formData.isElective}
              onChange={toggleElective}
            />
            <StudentRequiredStudentsInput
              requiredPassedStudents={formData.requiredPassedStudents}
              onAdd={addEmptyRequiredPassedStudent}
              onRemove={removeRequiredPassedStudent}
              onChange={handleRequiredPassedStudentChange}
              getPossibleRequiredStudents={getPossibleRequiredStudents}
              formData={formData}
              error={errors.requiredPassedStudents}
            />
            <StudentFormButtons onCancel={onCancel} onDelete={handleDelete} />
          </form>
        </div>
      </div>
    )
  );
};

export default StudentForm;
