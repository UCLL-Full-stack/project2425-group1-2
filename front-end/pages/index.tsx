import ErrorDialog from "@/components/ErrorDialog";
import TabsOverviewSection from "@/components/home/TabsOverviewSection";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Home";

export default function Home() {
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
      <TabsOverviewSection />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
