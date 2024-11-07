import Head from "next/head";
import React from "react";

const DefaultHead: React.FC = () => {
  return (
    <>
      <Head>
        <meta name="description" content="ISP" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
    </>
  );
};

export default DefaultHead;
