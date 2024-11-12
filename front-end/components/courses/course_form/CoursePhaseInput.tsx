import React from 'react';

interface CoursePhaseInputProps {
    phase: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const CoursePhaseInput = React.memo(({ phase, onChange, error }: CoursePhaseInputProps) => (
    <div className="flex-1 flex flex-col">
        <label htmlFor="phase" className="mb-1">Phase</label>
        <input
            type="number"
            name="phase"
            id="phase"
            value={phase}
            onChange={onChange}
            className="p-2 rounded bg-gray-700 text-lg"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
));

export default CoursePhaseInput;