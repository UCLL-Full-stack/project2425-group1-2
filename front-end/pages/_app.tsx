import AuthProvider from "@/components/AuthProvider";
import RouteProtectionLayout from "@/components/layouts/RouteProtectionLayout";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RouteProtectionLayout>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteProtectionLayout>
    </AuthProvider>
  );
}
