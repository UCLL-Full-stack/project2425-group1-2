// import React, { ReactNode, Suspense, useMemo } from "react";
// import { useAuth } from "./AuthProvider";
// import { useRouter } from "next/router";

// …
// const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const router = useRouter();
//   const { data } = useAuth();
//   const AllRoutes = useMemo(
//     () => React.lazy(() => import("../routes/IndexRoute")),
//     []
//   );

//   return (
//     <Suspense fallback="...Loading">
//       <AllRoutes>
//         {data ? children : router.push("/login")}
//       </AllRoutes>
//     </Suspense>
//   );
// };

// export default ProtectedRoute;