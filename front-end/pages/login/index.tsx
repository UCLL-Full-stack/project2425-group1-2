import LoginForm from "@/components/login/LoginForm";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import Head from "next/head";

const TITLE = "Login";

export default function Login() {
  const { errors, setErrors, handleError } = useErrorHandler();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <LoginForm />
    </>
  );
}
