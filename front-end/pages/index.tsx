import TabsOverviewSection from "@/components/home/TabsOverviewSection";
import Head from "next/head";

const TITLE = "Home";

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <TabsOverviewSection />
    </>
  );
}
