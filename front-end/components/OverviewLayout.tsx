import React from "react";

interface OverviewLayoutProps {
  children: React.ReactNode;
  flex: "row" | "col";
}

const OverviewLayout = React.memo(({ children, flex }: OverviewLayoutProps) => {
  const flexClass = flex === "row" ? "flex-row gap-8" : "flex-col gap-3";

  return (
    <section className={`m-8 w-fit h-auto max-w-75%w flex ${flexClass}`}>
      {children}
    </section>
  );
});

export default OverviewLayout;
