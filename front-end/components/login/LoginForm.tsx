import React from "react";
import FormInput from "../forms/FormInput";

const LoginForm = React.memo(() => {
  const textInputClass = `p-1 pl-4 rounded shadow-regular text-gray-800 `;
  return (
    <>
      <section className="m-auto w-112 bg-primary shadow-regular rounded mt-28 ">
        <form className="flex flex-col gap-3 p-16 ">
          <h2 className="text-center">Welcome!</h2>
          <FormInput
            name="email"
            labelText="Email"
            inputType="email"
            inputClassName={textInputClass}
            required={true}
          />
          <FormInput
            name="password"
            labelText="Password"
            inputType="password"
            inputClassName={textInputClass}
            required={true}
          />
          <button className="bg-safe p-2 rounded shadow-regular hover:shadow-success mt-3 w-fit self-center">
            Continue
          </button>
        </form>
      </section>
    </>
  );
});

export default LoginForm;
