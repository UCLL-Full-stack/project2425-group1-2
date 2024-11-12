import React from "react";
import { nationalities } from "@/utils/nationalities";

interface StudentNationalityInputProps {
  nationality?: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  error?: string;
}

const StudentNationalityInput = React.memo(
  ({ nationality, onChange, error }: StudentNationalityInputProps) => (
    <div className="flex-1 flex flex-col">
      <label htmlFor="nationality" className="mb-1">
        Nationality
      </label>
      <div className="flex items-center">
        <select
          name="nationality"
          id="nationalitySelect"
          value={nationality}
          onChange={onChange}
          className="p-2 rounded bg-gray-700 text-lg w-full focus:bg-gray-700 min-w-16"
        >
          <option>{nationality || "Select a nationality"}</option>
          {nationalities.map((name, id) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
);

export default StudentNationalityInput;
