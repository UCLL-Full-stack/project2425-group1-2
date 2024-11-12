import React from 'react';

interface CourseNameInputProps {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const CourseNameInput = React.memo(({ name, onChange, error }: CourseNameInputProps) => (
    <div className="flex-1 flex flex-col">
        <label htmlFor="name" className="mb-1">Course Name</label>
        <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
            className="p-2 rounded bg-gray-700 text-lg"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
));

export default CourseNameInput;
