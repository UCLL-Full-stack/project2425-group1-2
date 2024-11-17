import FormButtons from "@/components/forms/FormButtons";
import FormLayout from "@/components/forms/FormLayout";
import FormObjectsInput from "@/components/forms/FormObjectsInput";
import SelectEntityItemInput from "@/components/forms/SelectEntityItemInput";
import SelectListInput from "@/components/forms/SelectListInput";
import { CourseShort, EntityItem, ISP, ISPStatus } from "@/types";
import { ErrorState } from "@/types/errorState";
import { getDefaultCourse } from "@/utils/defaultTypes";
import { useStudentsShortGetter } from "@/utils/hooks/useStudentsShortGetter";
import { mapCourseShortToString } from "@/utils/mappers";
import { validateISP } from "@/utils/validators";
import React, { useEffect, useMemo, useState } from "react";
import FormInput from "../../forms/FormInput";

interface ISPFormProps {
  isp: ISP | null;
  formName: string;
  getPossibleCourses: (isp: ISP) => CourseShort[];
  onSubmit: (isp: ISP) => Promise<void>;
  onCancel: () => void;
  onDelete?: (id: number) => Promise<void>;
}

const ISPForm = React.memo(
  ({
    isp,
    formName,
    getPossibleCourses,
    onSubmit,
    onCancel,
    onDelete,
  }: ISPFormProps) => {
    const [formData, setFormData] = useState(isp);
    const [errors, setErrors] = useState<ErrorState>({});
    const { students } = useStudentsShortGetter();

    const availableCourses = useMemo(
      () => (formData && getPossibleCourses(formData)) || [],
      [formData?.courses]
    );
    const courseCreditsSum = useMemo(
      () => formData?.courses.reduce((acc, course) => acc + course.credits, 0),
      [formData?.courses]
    );
    const canAddCourse = useMemo(
      () =>
        (availableCourses &&
          availableCourses.length > 0 &&
          formData &&
          formData.courses &&
          !formData.courses.some((c) => c.id === -1)) ||
        false,
      [availableCourses, formData?.courses]
    );

    useEffect(() => {
      setErrors({});
      setFormData(isp);
    }, [isp]);

    if (!formData) {
      return null;
    }

    const availableYears = Array.from(
      { length: 27 },
      (_, i) => new Date().getFullYear() - 20 + i
    );

    const handleDelete = async () => {
      if (isp && onDelete) {
        await onDelete(isp.id);
      }
    };

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      let { name, value } = e.target;
      if (name === "startYear" || name === "totalCredits") {
        setFormData({ ...formData, [name]: parseInt(value) });
        return;
      }
      setFormData({ ...formData, [name]: value });
    };

    const handleStudentChange = (student: EntityItem) => {
      setFormData({
        ...formData,
        student: student,
      });
    };

    const handleCourseChange = (
      index: number,
      possibleCoursesIndex: number
    ) => {
      const course = availableCourses[possibleCoursesIndex];
      if (!course) {
        return;
      }
      const newCourses = [...formData.courses];
      newCourses[index] = course;
      setFormData({
        ...formData,
        courses: newCourses,
      });
    };

    const addEmptyCourse = () => {
      setFormData({
        ...formData,
        courses: [...formData.courses, getDefaultCourse()],
      });
    };

    const removeCourse = (index: number) => {
      const newCourses = formData.courses.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        courses: newCourses,
      });
    };

    const toggleSubmitted = () => {
      setFormData({
        ...formData,
        status:
          formData.status === ISPStatus.SUBMITTED
            ? ISPStatus.NOTSUBMITTED
            : ISPStatus.SUBMITTED,
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateISP(formData, setErrors)) {
        return;
      }
      await onSubmit(formData);
    };

    return (
      formData && (
        <FormLayout formName={formName} onSubmit={handleSubmit}>
          <FormInput
            name="totalCredits"
            labelText="Total Credits"
            inputType="number"
            value={formData.totalCredits}
            onChange={handleChange}
            error={errors.name}
          />
          <FormInput
            name="submitted"
            labelText="Submitted"
            inputType="checkbox"
            checked={formData.status === ISPStatus.SUBMITTED}
            onChange={toggleSubmitted}
          />
          <SelectListInput<number>
            name="startYear"
            labelText="Select Year"
            value={formData.startYear}
            values={availableYears}
            onChange={handleChange}
            parseValue={(year) => `${year}-${year + 1}`}
            error={errors.status}
          />
          <SelectEntityItemInput
            name="student"
            labelText="Student"
            value={formData.student}
            values={students}
            onChange={handleStudentChange}
            error={errors.student}
          />
          <FormObjectsInput
            name="courses"
            labelText={`Courses: ${courseCreditsSum} credits`}
            objects={formData.courses.map(mapCourseShortToString)}
            onAdd={addEmptyCourse}
            onRemove={removeCourse}
            onChange={handleCourseChange}
            canAddNewObject={canAddCourse}
            availableObjects={availableCourses.map(mapCourseShortToString)}
            error={errors.privileges}
          />
          <FormButtons onCancel={onCancel} onDelete={handleDelete} />
        </FormLayout>
      )
    );
  }
);

export default ISPForm;
