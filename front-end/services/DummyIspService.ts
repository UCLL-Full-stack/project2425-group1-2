import { ErrorState } from "@/types/errorState";
import { students } from "./DummyStudentService";
import {
  CourseShort,
  CreateISPView,
  ISP,
  UpdateISPView,
  ISPStatus,
  ISPShort,
} from "../types/index";
import CourseService from "./CourseService";

let isps: ISP[] = [
  {
    id: 1,
    status: ISPStatus.SUBMITTED,
    totalCredits: 30,
    startYear: 2024,
    courses: [],
    student: { id: students[0].id, name: students[0].name },
  },
  {
    id: 2,
    status: ISPStatus.NOTSUBMITTED,
    totalCredits: 20,
    startYear: 2024,
    courses: [],
    student: { id: students[1].id, name: students[1].name },
  },
  {
    id: 3,
    status: ISPStatus.SUBMITTED,
    totalCredits: 25,
    startYear: 2024,
    courses: [],
    student: { id: students[2].id, name: students[2].name },
  },
  {
    id: 4,
    status: ISPStatus.NOTSUBMITTED,
    totalCredits: 35,
    startYear: 2024,
    courses: [],
    student: { id: students[3].id, name: students[3].name },
  },
  {
    id: 5,
    status: ISPStatus.SUBMITTED,
    totalCredits: 40,
    startYear: 2024,
    courses: [],
    student: { id: students[4].id, name: students[4].name },
  },
];

let nextId = isps.length + 1;

const getAllISPShort = async (errorCallback?: (error: ErrorState) => void) => {
  return isps.map((isp) => ({
    id: isp.id,
    status: isp.status,
    totalCredits: isp.totalCredits,
    startYear: isp.startYear,
    student: { id: isp.student.id, name: isp.student.name },
  }));
};

const getISPShortByStudentId = async (
  studentId: number,
  errorCallback?: (error: ErrorState) => void
): Promise<ISPShort[] | null> => {
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

const getISPById = async (
  id: number,
  errorCallback?: (error: ErrorState) => void
) => {
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
    (isp) =>
      isp.startYear === ispData.startYear &&
      isp.student.id === ispData.studentId
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
  const newISP: ISP = {
    id: nextId++,
    status: ISPStatus.NOTSUBMITTED,
    totalCredits: ispData.totalCredits,
    startYear: ispData.startYear,
    courses: [],
    student: {
      id: ispData.studentId,
      name: students[ispData.studentId - 1].name,
    },
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
  isp.student = { id: ispData.studentId, name: students[ispData.studentId - 1].name };

  let totalCourseCredits = 0;
  let courses = await Promise.all(
    ispData.courses.map(async (courseId) => {
      const course = await CourseService.getCourseById(courseId, errorCallback);
      if (!course) {
        return null;
      }
      totalCourseCredits += course.credits;
      return {
        id: courseId,
        name: course.name,
        phase: course.phase,
        credits: course.credits,
      };
    })
  );

  if (totalCourseCredits > isp.totalCredits) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `Total course credits exceed the ISP's total credits.`,
      });
    }
    return null;
  }

  isp.courses = courses.filter((course) => course !== null) as CourseShort[];
  isp.status = ispData.status;
  return isp;
};

const updateISPByStudentId = async (
  id: number,
  ispData: { status: ISPStatus; courses: number[] },
  errorCallback?: (error: ErrorState) => void
) => {
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

  let totalCourseCredits = 0;
  let courses = await Promise.all(
    ispData.courses.map(async (courseId) => {
      const course = await CourseService.getCourseById(courseId, errorCallback);
      if (!course) {
        return null;
      }
      totalCourseCredits += course.credits;
      return {
        id: courseId,
        name: course.name,
        phase: course.phase,
        credits: course.credits,
      };
    })
  );

  if (totalCourseCredits > isp.totalCredits) {
    if (errorCallback) {
      errorCallback({
        status: "application error",
        message: `Total course credits exceed the ISP's total credits.`,
      });
    }
    return null;
  }

  isp.courses = courses.filter((course) => course !== null) as CourseShort[];
  isp.status = ispData.status;
  return isp;
};

const deleteISP = async (
  id: number,
  errorCallback?: (error: ErrorState) => void
) => {
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

export default {
  getAllISPShort,
  getISPShortByStudentId,
  getISPById,
  createISP,
  updateISP,
  updateISPByStudentId,
  deleteISP,
};
