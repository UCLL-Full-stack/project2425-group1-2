import React from "react";

const LoginForm: React.FC = () => {
  const textInputClass = `p-1 pl-4 rounded shadow-regular text-gray-800`;
  return (
    <>
      <section className="m-auto w-96 bg-primary shadow-regular rounded mt-10">
        <h1 className="text-center pt-4">Welcome!</h1>
        <form className="flex flex-col gap-3 p-4">
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className={textInputClass}
            required
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className={textInputClass}
            required
          />
          <button className="bg-safe p-2 rounded shadow-regular hover:shadow-success mt-3 w-1/3 self-center">
            Continue
          </button>
        </form>
      </section>
    </>
  );
};

export default LoginForm;
