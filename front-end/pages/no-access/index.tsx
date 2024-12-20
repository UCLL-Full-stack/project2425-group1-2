import LinkButton from "@/components/buttons/LinkButton";
import CenteredFitContentLayout from "@/components/layouts/CenteredFitContentLayout";
import { HOME_URL } from "@/utils/urls";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TITLE = "your profile";
const MAIN_SECTION_TITLE = "No access";

export default function NoAccess() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <CenteredFitContentLayout>
        <section className="flex flex-col gap-4 items-center">
          <h2> {MAIN_SECTION_TITLE}</h2>
          <p> You do not have access to this page</p>
          <div className="w-fit">
            <LinkButton text="Home" href={HOME_URL} />
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
