import { ErrorState } from "@/types/errorState";
import { Admin, Privilege, PrivilegeType, Student } from "../types/index";
import { privileges } from "./DummyPrivilegeService";

export let admins: Admin[] = [
  {
    id: 1,
    name: "Zeus",
    email: "zeus@example.com",
    password: "password123",
    privileges: [privileges[0], privileges[1], privileges[2]],
  },
  {
    id: 2,
    name: "Hera",
    email: "hera@example.com",
    password: "password123",
    privileges: [privileges[3], privileges[4], privileges[5]],
  },
  {
    id: 3,
    name: "Poseidon",
    email: "poseidon@example.com",
    password: "password123",
    privileges: [privileges[6], privileges[7], privileges[8]],
  },
  {
    id: 4,
    name: "Demeter",
    email: "demeter@example.com",
    password: "password123",
    privileges: [privileges[9], privileges[10], privileges[11]],
  },
  {
    id: 5,
    name: "Athena",
    email: "athena@example.com",
    password: "password123",
    privileges: privileges,
  },
];

let nextId = admins.length + 1;

const getAllShortAdmins = async (errorCallback?: (error: ErrorState) => void) => {
  return admins.map((admin) => ({ id: admin.id, name: admin.name }));
};

const getAdminById = async (
  id: number,
  errorCallback?: (error: ErrorState) => void
) => {
  const admin = admins.find((admin) => admin.id === id);
  if (!admin && errorCallback) {
    errorCallback({
      status: "application error",
      message: `Admin with ID ${id} does not exist.`,
    });
  }
  return admin;
};

const createAdmin = async (
  admin: Admin,
  errorCallback?: (error: ErrorState) => void
) => {
  const newAdmin: Admin = { ...admin, id: nextId++ };
  admins.push(newAdmin);
  return newAdmin;
};

const updateAdmin = async (
  id: number,
  admin: Admin,
  errorCallback?: (error: ErrorState) => void
) => {
  const index = admins.findIndex((a) => a.id === id);
  if (index === -1) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `Admin with ID ${id} does not exist. Update failed.`,
      });
    }
    return null;
  }
  admins[index] = { ...admins[index], ...admin };
  return admins[index];
};

const deleteAdmin = async (
  id: number,
  errorCallback?: (error: ErrorState) => void
) => {
  const index = admins.findIndex((admin) => admin.id === id);
  if (index === -1) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `Admin with ID ${id} does not exist. Deletion failed.`,
      });
    }
    return null;
  }
  const deletedAdmin = admins.splice(index, 1);
  return deletedAdmin[0];
};

const DummyAdminService = {
  getAllShortAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};

export default DummyAdminService;
