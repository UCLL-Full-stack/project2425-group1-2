import React from 'react';

interface CourseElectiveInputProps {
    isElective: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const CourseElectiveInput = React.memo(({ isElective, onChange, error }: CourseElectiveInputProps) => (
    <div className="flex-1 flex flex-row gap-2 items-center">
        <label htmlFor="isElective" className="mb-1">Elective</label>
        <input
            type="checkbox"
            name="isElective"
            id="isElective"
            checked={isElective}
            onChange={onChange}
            className="p-2 rounded bg-gray-700 checked:bg-success text-alter focus:ring-offset-0 focus:ring-0"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
));

export default CourseElectiveInput;