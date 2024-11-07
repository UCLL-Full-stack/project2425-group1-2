import ErrorDialog from "@/components/ErrorDialog";
import TabsOverviewSection from "@/components/home/TabsOverviewSection";
import LoginForm from "@/components/login/LoginForm";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Login";

export default function Login() {
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

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <LoginForm />
    </>
  );
}
