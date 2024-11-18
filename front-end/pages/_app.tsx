import AuthProvider from "@/components/AuthProvider";
import RouteProtectionLayout from "@/components/layouts/RouteProtectionLayout";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <AuthProvider>
        <RouteProtectionLayout>
          <Component {...pageProps} />
        </RouteProtectionLayout>
      </AuthProvider>
    </Layout>
  );
}
