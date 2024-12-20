import LinkButton from "@/components/buttons/LinkButton";
import CenteredFitContentLayout from "@/components/layouts/CenteredFitContentLayout";
import { LOGIN_URL } from "@/utils/urls";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TITLE = "your profile";
const MAIN_SECTION_TITLE = "Login Required";

export default function LoginRequired() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <CenteredFitContentLayout>
        <section className="flex flex-col gap-4 items-center">
          <h2> {MAIN_SECTION_TITLE}</h2>
          <p>You must be logged in to access this page.</p>
          <div className="w-fit">
            <LinkButton text="Login" href={LOGIN_URL} />
          </div>
        </section>
      </CenteredFitContentLayout>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { locale } = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
}