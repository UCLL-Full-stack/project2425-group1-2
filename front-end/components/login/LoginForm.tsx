import React from "react";

const LoginForm = React.memo(() => {
  const textInputClass = `p-1 pl-4 rounded shadow-regular text-gray-800 `;
  return (
    <>
      <section className="m-auto w-112 bg-primary shadow-regular rounded mt-28 ">
        <form className="flex flex-col gap-3 p-16 ">
          <h2 className="text-center">Welcome!</h2>
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
          <button className="bg-safe p-2 rounded shadow-regular hover:shadow-success mt-3 w-fit self-center">
            Continue
          </button>
        </form>
      </section>
    </>
  );
});

export default LoginForm;
