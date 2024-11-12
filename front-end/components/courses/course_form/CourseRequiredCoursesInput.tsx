import { Course } from '@/types';
import React from 'react';

interface CourseRequiredCoursesInputProps {
    requiredPassedCourses: { id: number, name: string }[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onChange: (index: number, course: { id: number, name: string }) => void;
    getPossibleRequiredCourses: (formData: Course) => { id: number, name: string }[];
    formData: Course;
    error?: string;
}

const CourseRequiredCoursesInput: React.FC<CourseRequiredCoursesInputProps> = React.memo(({
    requiredPassedCourses,
    onAdd,
    onRemove,
    onChange,
    getPossibleRequiredCourses,
    formData,
    error
}) => (
    <div className="flex-1 flex flex-col">
        <label htmlFor="requiredPassedCourses" className="mb-1">Required Courses</label>
        <div className="flex items-center gap-2 flex-wrap">
            {requiredPassedCourses.map((course, index) => (
                <div key={course.id} className="relative flex items-center rounded-full">
                    <select
                        onChange={(e) => onChange(index, { id: parseInt(e.target.value), name: e.target.selectedOptions[0].text })}
                        className="rounded-full h-full bg-inherit text-lg bg-gray-500 border-2 border-gray-700 focus:bg-gray-700 min-w-16"
                    >
                        <option value={course.id}>{course.name || "Select a course"}</option>
                        {getPossibleRequiredCourses(formData).map((courseOption) => (
                            <option key={courseOption.id} value={courseOption.id}>
                                {courseOption.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => onRemove(index)}
                        className="absolute text-sm right-0 mr-2 bg-indigo-700 hover:bg-indigo-950 w-6 h-6 rounded-full"
                    >
                        X
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={onAdd}
                className="bg-safe rounded-full h-8 w-8 shadow-regular hover:shadow-success"
            >
                +
            </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
));

export default CourseRequiredCoursesInput;