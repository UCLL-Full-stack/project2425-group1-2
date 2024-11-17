import { LoginData } from "@/types/auth";
import { mapPrivilegeToString } from "@/utils/mappers";
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

const jwt = require("jsonwebtoken");

// Secret key used to sign the JWT (keep it private and secure)
const SECRET_KEY = "yourSecretKey";

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
    throw new Error("Invalid credentials");
  }

  const payload = {
    user: user.email,
    roles: admin ? ["admin"] : ["student"],
    privileges: admin ? admin.privileges : [],
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // Expires in 1 hour

  let resData = {
    user: user.email,
    roles: admin ? ["admin"] : ["student"],
    privileges: admin ? admin.privileges.map(mapPrivilegeToString) : [],
  };

  let res = {
    data: resData,
    token: token, // Generated JWT token
    message: "success login"
  };

  return res;
};

export const DummyAuthService = {
  login,
};
