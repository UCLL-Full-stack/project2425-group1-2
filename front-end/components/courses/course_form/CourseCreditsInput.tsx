import React from 'react';

interface CourseCreditsInputProps {
    credits: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const CourseCreditsInput = React.memo(({ credits, onChange, error }: CourseCreditsInputProps) => (
    <div className="flex-1 flex flex-col">
        <label htmlFor="credits" className="mb-1">Credits</label>
        <input
            type="number"
            name="credits"
            id="credits"
            value={credits}
            onChange={onChange}
            className="p-2 rounded bg-gray-700 text-lg"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
));

export default CourseCreditsInput;