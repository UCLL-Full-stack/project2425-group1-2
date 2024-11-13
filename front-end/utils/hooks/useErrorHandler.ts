import { useState } from "react";

export const useErrorHandler = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleError = (error: {}) => {
    const newErrors: { [key: string]: string } = {};
    if (error) {
      Object.entries(error).forEach(([key, value]) => {
        newErrors[key] = value as string;
      });
    }
    setErrors(newErrors);
  };

  return { errors, setErrors, handleError };
};
