import { ISP } from '../model/isp';
import students from '../data/students';
import courses from '../data/courses';
import { IspStatus } from '@prisma/client';

let isps: ISP[] = [
    new ISP({
        id: 1,
        status: IspStatus.SUBMITTED,
        totalCredits: 30,
        startYear: 2021,
        courses: [],
        student: students[0],
    }),
    new ISP({
        id: 2,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 20,
        startYear: 2020,
        courses: [],
        student: students[1],
    }),
    new ISP({
        id: 3,
        status: IspStatus.SUBMITTED,
        totalCredits: 25,
        startYear: 2022,
        courses: [],
        student: students[2],
    }),
    new ISP({
        id: 4,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 15,
        startYear: 2019,
        courses: [],
        student: students[3],
    }),
    new ISP({
        id: 5,
        status: IspStatus.SUBMITTED,
        totalCredits: 35,
        startYear: 2023,
        courses: [],
        student: students[4],
    }),
    new ISP({
        id: 6,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 30,
        startYear: 2024,
        courses: [],
        student: students[5],
    }),
    new ISP({
        id: 7,
        status: IspStatus.SUBMITTED,
        totalCredits: 40,
        startYear: 2025,
        courses: [],
        student: students[6],
    }),
    new ISP({
        id: 8,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 25,
        startYear: 2026,
        courses: [],
        student: students[7],
    }),
    new ISP({
        id: 9,
        status: IspStatus.SUBMITTED,
        totalCredits: 30,
        startYear: 2027,
        courses: [],
        student: students[8],
    }),
    new ISP({
        id: 10,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 20,
        startYear: 2028,
        courses: [],
        student: students[9],
    }),
    new ISP({
        id: 11,
        status: IspStatus.SUBMITTED,
        totalCredits: 35,
        startYear: 2029,
        courses: [],
        student: students[10],
    }),
    new ISP({
        id: 12,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 25,
        startYear: 2030,
        courses: [],
        student: students[11],
    }),
    new ISP({
        id: 13,
        status: IspStatus.SUBMITTED,
        totalCredits: 40,
        startYear: 2031,
        courses: [],
        student: students[12],
    }),
    new ISP({
        id: 14,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 30,
        startYear: 2032,
        courses: [],
        student: students[13],
    }),
    new ISP({
        id: 15,
        status: IspStatus.SUBMITTED,
        totalCredits: 20,
        startYear: 2033,
        courses: [],
        student: students[14],
    }),
    new ISP({
        id: 16,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 35,
        startYear: 2034,
        courses: [],
        student: students[15],
    }),
    new ISP({
        id: 17,
        status: IspStatus.SUBMITTED,
        totalCredits: 40,
        startYear: 2035,
        courses: [courses[16]],
        student: students[0],
    }),
    new ISP({
        id: 18,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 25,
        startYear: 2036,
        courses: [courses[17]],
        student: students[1],
    }),
    new ISP({
        id: 19,
        status: IspStatus.SUBMITTED,
        totalCredits: 30,
        startYear: 2037,
        courses: [courses[18]],
        student: students[2],
    }),
    new ISP({
        id: 20,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 15,
        startYear: 2038,
        courses: [courses[19]],
        student: students[3],
    }),
    new ISP({
        id: 21,
        status: IspStatus.SUBMITTED,
        totalCredits: 30,
        startYear: 2039,
        courses: [courses[20]],
        student: students[4],
    }),
    new ISP({
        id: 22,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 20,
        startYear: 2040,
        courses: [courses[21]],
        student: students[5],
    }),
    new ISP({
        id: 23,
        status: IspStatus.SUBMITTED,
        totalCredits: 35,
        startYear: 2041,
        courses: [courses[22]],
        student: students[6],
    }),
    new ISP({
        id: 24,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 30,
        startYear: 2042,
        courses: [courses[23]],
        student: students[7],
    }),
    new ISP({
        id: 25,
        status: IspStatus.SUBMITTED,
        totalCredits: 40,
        startYear: 2043,
        courses: [courses[24]],
        student: students[8],
    }),
    new ISP({
        id: 26,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 25,
        startYear: 2044,
        courses: [courses[25]],
        student: students[9],
    }),
    new ISP({
        id: 27,
        status: IspStatus.SUBMITTED,
        totalCredits: 30,
        startYear: 2045,
        courses: [courses[26]],
        student: students[10],
    }),
    new ISP({
        id: 28,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 40,
        startYear: 2046,
        courses: [courses[27]],
        student: students[11],
    }),
    new ISP({
        id: 29,
        status: IspStatus.SUBMITTED,
        totalCredits: 20,
        startYear: 2047,
        courses: [courses[28]],
        student: students[12],
    }),
    new ISP({
        id: 30,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 35,
        startYear: 2048,
        courses: [courses[29]],
        student: students[13],
    }),
];

export default isps;
