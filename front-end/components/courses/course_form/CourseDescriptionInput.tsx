import React from 'react';

interface CourseDescriptionInputProps {
    description: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
}

const CourseDescriptionInput = React.memo(({ description, onChange, error }: CourseDescriptionInputProps) => (
    <div className="flex-1 flex flex-col">
        <label htmlFor="description" className="mb-1">Description</label>
        <textarea
            name="description"
            id="description"
            value={description}
            onChange={onChange}
            className="p-2 rounded bg-gray-700 text-lg"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
));

export default CourseDescriptionInput;