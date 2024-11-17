import { Role } from "@/types";
import { LoginData } from "@/types/auth";
import { BACKEND_APP_URL } from "@/utils/urls";
import { admins } from "./DummyAdminService";
import { students } from "./DummyStudentService";

const URL = BACKEND_APP_URL + "/auth";

// const login = async (data: LoginData) => {
//   try {
//     const response = await fetch(URL + "/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     const res = await response.json();
//     if (res.data) {
//       return res.data;
//     }
//     throw new Error(res.message);
//   } catch (err) {
//     console.error(err);
//   }
// };

const crypto = require("crypto");

// Secret key used to sign the JWT (keep it private and secure)
const SECRET_KEY = Buffer.from("lalelele", "utf-8");

const login = async (data: LoginData) => {
  let admin = admins.find(
    (admin) => admin.email === data.username && admin.password === data.password
  );
  let student = students.find(
    (student) =>
      student.email === data.username && student.password === data.password
  );

  const user = admin || student;

  if (user === undefined) {
    console.log("Invalid credentials");
    throw new Error("Invalid credentials");
  }

  const payload = {
    user: user.email,
    role: admin ? Role.ADMIN : Role.STUDENT,
    privileges: admin ? admin.privileges.map((pr) => pr.name) : [],
  };

  const tokenData = `${data.username}&timestamp=${Date.now()}`;
  const token = crypto
    .createHmac("sha256", { SECRET_KEY })
    .update(tokenData)
    .digest("hex");

  let res = {
    data: payload,
    token: token, // Generated JWT token
    message: "success login",
  };

  return res;
};

export const DummyAuthService = {
  login,
};
