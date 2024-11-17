import AuthProvider from "@/components/AuthProvider";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
