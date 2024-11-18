import FixedCreateButton from "@/components/buttons/FixedCreateButton";
import ErrorDialog from "@/components/ErrorDialog";
import ObjectsWithHeadingLayout from "@/components/layouts/ObjectsWithHeadingLayout";
import AdminForm from "@/components/users/admins/AdminForm";
import UserEditableItem from "@/components/users/UserEditableItem";
import AdminService from "@/services/DummyAdminService";
import { Admin, Privilege, PrivilegeType } from "@/types";
import { getDefaultAdmin } from "@/utils/defaultTypes";
import { useCrudAdmin } from "@/utils/hooks/useCrudAdmin";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { usePrivilegeGetter } from "@/utils/hooks/usePrivilegeGetter";
import { usePrivilegeVerifier } from "@/utils/hooks/usePrivilegeVerifier";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage Admins";
const MAIN_SECTION_TITLE = "Manage admins";

export default function ManageAdmins() {
  const [updatingAdmin, setUpdatingAdmin] = useState<Admin | null>(null);
  const [creatingAdmin, setCreatingAdmin] = useState<Admin | null>(null);
  const { errors, setErrors, handleError } = useErrorHandler();
  const { admins, updateAdmin, createAdmin, deleteAdmin } =
    useCrudAdmin(handleError);
  const { privileges } = usePrivilegeGetter(handleError);
  const { verifyPrivilege } = usePrivilegeVerifier(handleError);

  const handleUpdate = async (id: number) => {
    const admin: Admin | undefined = await AdminService.getAdminById(
      id,
      handleError
    );
    if (admin) {
      setUpdatingAdmin(admin);
    }
  };

  const handleCreate = () => {
    const admin: Admin = getDefaultAdmin();
    setCreatingAdmin(admin);
  };

  const handleSubmit = async (admin: Admin) => {
    updatingAdmin ? await update(admin) : await create(admin);
  };

  const update = async (admin: Admin) => {
    const verified = await verifyPrivilege(PrivilegeType.UPDATE_ADMINISTRATIVE);
    if (!verified) {
      return;
    }
    await updateAdmin(admin);
    setUpdatingAdmin(null);
  };

  const create = async (admin: Admin) => {
    const verified = await verifyPrivilege(PrivilegeType.CREATE_ADMINISTRATIVE);
    if (!verified) {
      return;
    }
    await createAdmin(admin);
    setCreatingAdmin(null);
  };

  const handleCancel = () => {
    setCreatingAdmin(null);
    setUpdatingAdmin(null);
  };

  const handleDelete = async (id: number) => {
    const verified = await verifyPrivilege(PrivilegeType.DELETE_ADMINISTRATIVE);
    if (!verified) {
      return;
    }
    await deleteAdmin(id);
    setUpdatingAdmin(null);
  };

  const getPossiblePrivileges = (admin: Admin): Privilege[] => {
    const privilegesIds = new Set(
      admin.privileges.map((privilege) => privilege.id)
    );

    return privileges.filter((privilege) => !privilegesIds.has(privilege.id));
  };

  const manageTabIsActive =
    updatingAdmin == null &&
    creatingAdmin == null &&
    Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <ObjectsWithHeadingLayout
        objects={admins}
        isActive={manageTabIsActive}
        flex="row"
        headingTitle={MAIN_SECTION_TITLE}
        children={(admin: Admin) => (
          <UserEditableItem
            student={admin}
            redactorStudent={handleUpdate}
            isActive={manageTabIsActive}
          />
        )}
      />
      <AdminForm
        admin={updatingAdmin || creatingAdmin}
        formName={updatingAdmin ? "Update admin" : "Create admin"}
        getPossiblePrivileges={getPossiblePrivileges}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
      <FixedCreateButton onClick={handleCreate} isActive={manageTabIsActive} />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}
