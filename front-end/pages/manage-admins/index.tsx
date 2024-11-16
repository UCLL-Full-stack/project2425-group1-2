// import ErrorDialog from "@/components/ErrorDialog";
// import MapObjectsLayout from "@/components/layouts/MapObjectsLayout";
// import AdminService from "@/services/DummyAdminService";
// import { Admin, EntityItem } from "@/types";
// import { useAdminsShortGetter } from "@/utils/hooks/useAdminsShortGetter";
// import { useCoursesShortGetter } from "@/utils/hooks/useCoursesShortGetter";
// import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
// import Head from "next/head";
// import { useState } from "react";

// const TITLE = "Manage Admins";
// const MAIN_SECTION_TITLE = "Manage admins";

// export default function manageAdmins() {
//   const [updatingAdmin, setUpdatingAdmin] = useState<Admin | null>(null);
//   const [creatingAdmin, setCreatingAdmin] = useState<Admin | null>(null);
//   const { errors, setErrors, handleError } = useErrorHandler();
//   const { admins, getAdmins } = useAdminsShortGetter(handleError);
//   const { roles } = useCoursesShortGetter(handleError);

//   const redactorAdmin = async (id: number) => {
//     const admin: Admin | undefined = await AdminService.getAdminById(
//       id,
//       handleError
//     );
//     if (admin) {
//       setUpdatingAdmin(admin);
//     }
//   };

//   const updateAdmin = async (admin: Admin) => {
//     await AdminService.updateAdmin(admin.id, admin, handleError);
//     setUpdatingAdmin(null);
//     await getAdmins();
//   };

//   const createAdmin = async (admin: Admin) => {
//     await AdminService.createAdmin(admin, handleError);
//     setCreatingAdmin(null);
//     await getAdmins();
//   };

//   const deleteAdmin = async (id: number) => {
//     await AdminService.deleteAdmin(id, handleError);
//     setUpdatingAdmin(null);
//     await getAdmins();
//   };

//   const getPossibleRoles = (admin: Admin): EntityItem[] => {
//     const rolesIds = new Set(admin.roles.map((role) => role.id));

//     return roles
//       .filter((role) => !rolesIds.has(role.id))
//       .map((role) => ({ id: role.id, name: role.name }));
//   };

//   const manageTabIsActive =
//     updatingAdmin == null &&
//     creatingAdmin == null &&
//     Object.keys(errors).length === 0;

//   return (
//     <>
//       <Head>
//         <title>{TITLE}</title>
//       </Head>
//       <h1 className="text-center mt-5">{MAIN_SECTION_TITLE}</h1>
//       <MapObjectsLayout
//         objects={admins}
//         flex="row"
//         children={(admin) => null}
//       />

//       {errors && Object.keys(errors).length > 0 && (
//         <ErrorDialog errors={errors} setErrors={setErrors} />
//       )}
//     </>
//   );
// }
