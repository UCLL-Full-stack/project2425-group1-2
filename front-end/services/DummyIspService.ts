import { ErrorState } from "@/types/errorState";
import { students } from "./DummyStudentService";
import { CourseShort, CreateISPView, ISP, UpdateISPView } from "../types/index";
import CourseService from "./CourseService";

let isps: ISP[] = [
  {
    id: 1,
    status: "SUBMITTED",
    totalCredits: 30,
    startYear: 2024,
    courses: [],
    student: { id: students[0].id, name: students[0].name },
  },
  {
    id: 2,
    status: "NOTSUBMITTED",
    totalCredits: 20,
    startYear: 2024,
    courses: [],
    student: { id: students[1].id, name: students[1].name },
  },
  {
    id: 3,
    status: "SUBMITTED",
    totalCredits: 25,
    startYear: 2024,
    courses: [],
    student: { id: students[2].id, name: students[2].name },
  },
  {
    id: 4,
    status: "NOTSUBMITTED",
    totalCredits: 35,
    startYear: 2024,
    courses: [],
    student: { id: students[3].id, name: students[3].name },
  },
  {
    id: 5,
    status: "SUBMITTED",
    totalCredits: 40,
    startYear: 2024,
    courses: [],
    student: { id: students[4].id, name: students[4].name },
  }
];

const getISPShorts = async (errorCallback?: (error: ErrorState) => void) => {
  return isps.map((isp) => ({
    id: isp.id,
    status: isp.status,
    totalCredits: isp.totalCredits,
    startYear: isp.startYear,
    studentId: isp.student.id,
  }));
};

const getISPShortByStudentId = async (
  studentId: number,
  errorCallback?: (error: ErrorState) => void
) => {
  const studentISPs = isps.filter((isp) => isp.student.id === studentId);
  if (studentISPs.length === 0) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `No ISPs found for student with ID ${studentId}.`,
      });
    }
    return null;
  }
  return studentISPs;
};

const getISPById = async (id: number, errorCallback?: (error: ErrorState) => void) => {
  const isp = isps.find((isp) => isp.id === id);
  if (!isp) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `ISP with ID ${id} does not exist.`,
      });
    }
    return null;
  }
  return isp;
};

const createISP = async (
  ispData: CreateISPView,
  errorCallback?: (error: ErrorState) => void
) => {
  const exists = isps.some(
    (isp) => isp.startYear === ispData.startYear && isp.student.id === ispData.studentId
  );
  if (exists) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `ISP for student with ID ${ispData.studentId} already exists for year ${ispData.startYear}.`,
      });
    }
    return null;
  }
  const newISP = {
    id: isps.length + 1,
    status: "NOTSUBMITTED",
    totalCredits: ispData.totalCredits,
    startYear: ispData.startYear,
    courses: [],
    student: { id: ispData.studentId, name: students[ispData.studentId - 1].name },
  };
  isps.push(newISP);
  return newISP;
};

const updateISP = async (
  id: number,
  ispData: UpdateISPView,
  errorCallback?: (error: ErrorState) => void
) => {
  const isp = await getISPById(id, errorCallback);
  if (!isp) {
    return null;
  }
  isp.startYear = ispData.startYear;
  isp.totalCredits = ispData.totalCredits;
  isp.status = ispData.status;

  let courses = await Promise.all(ispData.courses.map(async (courseId) => {
    const course = await CourseService.getCourseById(courseId, errorCallback);
    if (!course) {
      return null;
    }
    return { id: courseId, name: course.name, phase: course.phase, credits: course.credits };
  }));
  isp.courses = courses.filter(course => course !== null) as CourseShort[];
  return isp;
};

const updateISPByStudentId = async (
  studentId: number,
  id: number,
  ispData: { status: string; courses: number[] },
  errorCallback?: (error: ErrorState) => void
) => {
  const isp = isps.find((isp) => isp.id === id && isp.student.id === studentId);
  if (!isp) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `ISP with ID ${id} does not exist.`,
      });
    }
    return null;
  }
  if (isp.status === "SUBMITTED") {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `ISP with ID ${id} has already been submitted.`,
      });
    }
    return null;
  }
  Object.assign(isp, ispData);
  return isp;
};

const deleteISP = async (id: number, errorCallback?: (error: ErrorState) => void) => {
  const index = isps.findIndex((isp) => isp.id === id);
  if (index === -1) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `ISP with ID ${id} does not exist.`,
      });
    }
    return null;
  }
  return isps.splice(index, 1)[0];
};

const ISPService = {
  getISPShorts,
  getISPShortByStudentId,
  getISPById,
  createISP,
  updateISP,
  updateISPByStudentId,
  deleteISP,
};

export default ISPService;
