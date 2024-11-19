
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";
import DummyAdminService from "@/services/DummyAdminService";
import { Admin, UserShort } from "@/types";

export const useCrudAdmin = (errorCallback?: (error: ErrorState) => void) => {
  const [admins, setAdmins] = useState<UserShort[]>([]);

  const getAdmins = async () => {
    const admins: UserShort[] = await DummyAdminService.getAllShortAdmins(
      errorCallback
    );
    setAdmins(admins);
  };

  const updateAdmin = async (admin: Admin) => {
    await DummyAdminService.updateAdmin(
      admin.id,
      admin,
      errorCallback
    );
    await getAdmins();
  };

  const createAdmin = async (admin: Admin) => {
    await DummyAdminService.createAdmin(admin, errorCallback);
    await getAdmins();
  };

  const deleteAdmin = async (id: number) => {
    await DummyAdminService.deleteAdmin(id, errorCallback);
    await getAdmins();
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return {
    admins,
    setAdmins: setAdmins,
    getAdmins,
    updateAdmin,
    createAdmin,
    deleteAdmin,
  };
};
