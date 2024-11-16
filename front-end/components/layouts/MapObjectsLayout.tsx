import React from "react";
import OverviewLayout from "./OverviewLayout";

interface MapObjectsLayoutProps {
  objects: any[];
  children: (item: any, index: number) => React.ReactNode;
  flex: "row" | "col";
}

const MapObjectsLayout = React.memo(
  ({ objects, children, flex }: MapObjectsLayoutProps) => {
    const flexClass = flex === "row" ? "flex-row gap-8 flex-wrap" : "flex-col gap-6";

    return (
      <OverviewLayout>
        <section className={`flex ${flexClass}`}>
          {objects.map((obj, index) => {
            return (
              <div key={index} className="flex">
                {children(obj, index)}
              </div>
            );
          })}
        </section>
      </OverviewLayout>
    );
  }
);

export default MapObjectsLayout;
