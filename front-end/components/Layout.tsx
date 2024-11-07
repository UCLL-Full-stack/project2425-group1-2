// components/Layout.tsx
import React, { ReactNode } from "react";
import DefaultHead from "./DefaultHead";
import Header from "./header/Header";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <DefaultHead />
      <div className="font-poppins text-white font-bold text-sm bg-secondary">
        <Header />
        <main className="min-h-screen">{children}</main>
      </div>
    </>
  );
};

export default Layout;
