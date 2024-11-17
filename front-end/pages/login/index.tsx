import { useAuth } from "@/components/AuthProvider";
import ErrorDialog from "@/components/ErrorDialog";
import FormInput from "@/components/forms/FormInput";
import { LoginData } from "@/types/auth";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { validateLoginData } from "@/utils/validators";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Login";

export default function Login() {
  const { errors, setErrors, handleError } = useErrorHandler();
  const [input, setInput] = useState<LoginData>({
    username: "",
    password: "",
  });
  const auth = useAuth();

  const textInputClass = `p-1 pl-4 rounded shadow-regular text-gray-800 `;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLoginData(input, setErrors)) {
      await auth.login(input);
      return;
    }
    alert("please provide a valid input");
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <section className="m-auto w-112 bg-primary shadow-regular rounded mt-28 ">
        <form className="flex flex-col gap-3 p-16" onSubmit={handleSubmit}>
          <h2 className="text-center">Welcome!</h2>
          <FormInput
            name="username"
            labelText="Email"
            inputType="text"
            inputClassName={textInputClass}
            onChange={handleInput}
            error={errors.username}
          />
          <FormInput
            name="password"
            labelText="Password"
            inputType="password"
            inputClassName={textInputClass}
            onChange={handleInput}
            error={errors.password}
          />
          <button
            type="submit"
            className="bg-safe p-2 rounded shadow-regular hover:shadow-success mt-3 w-fit self-center"
          >
            Continue
          </button>
        </form>
      </section>
    </>
  );
}
