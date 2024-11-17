import { ErrorState } from "@/types/errorState";
import { BACKEND_APP_URL } from "@/utils/urls";
import { admins } from "./DummyAdminService";
import { students } from "./DummyStudentService";

const URL = BACKEND_APP_URL + "/users";

const getUserByEmail = async (
  email: string,
  errorCallback?: (error: ErrorState) => void
) => {
  let admin = admins.find((admin) => admin.email === email);
  let student = students.find((student) => student.email === email);

  let result = admin || student;
  if (result === undefined) {
    console.log("User not found");
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: "User not found",
      });
    }
  }

  return result;
};

const DummyUserService = {
  getUserByEmail,
};

export default DummyUserService;
