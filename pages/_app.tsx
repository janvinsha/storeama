import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}

export default MyApp;
