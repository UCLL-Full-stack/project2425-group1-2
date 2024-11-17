import React, { ReactNode } from "react";
import useRouteModifyer from "../useRouteModifyer";

interface RouteProtectionLayoutProps {
  children: ReactNode;
}

const RouteProtectionLayout: React.FC<RouteProtectionLayoutProps> = React.memo(
  ({ children }) => {
    useRouteModifyer();
    return <>{children}</>;
  }
);

export default RouteProtectionLayout;
