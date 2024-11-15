import React from "react";

interface ColumnOverviewLayoutProps {
  children: React.ReactNode;
}

const ColumnOverviewLayout = React.memo(({ children }: ColumnOverviewLayoutProps) => {
  return (
    <section className="m-8 h-auto w-fit max-w-75%w flex flex-col gap-3">
      {children}
    </section>
  );
});

export default ColumnOverviewLayout;
