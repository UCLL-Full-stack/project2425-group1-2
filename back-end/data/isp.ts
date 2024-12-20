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
        startYear: 2022,
        courses: [],
        student: students[5],
    }),
    new ISP({
        id: 7,
        status: IspStatus.SUBMITTED,
        totalCredits: 40,
        startYear: 2021,
        courses: [],
        student: students[6],
    }),
    new ISP({
        id: 8,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 25,
        startYear: 2020,
        courses: [],
        student: students[7],
    }),
    new ISP({
        id: 9,
        status: IspStatus.SUBMITTED,
        totalCredits: 30,
        startYear: 2021,
        courses: [],
        student: students[8],
    }),
    new ISP({
        id: 10,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 20,
        startYear: 2019,
        courses: [],
        student: students[9],
    }),
    new ISP({
        id: 11,
        status: IspStatus.SUBMITTED,
        totalCredits: 35,
        startYear: 2023,
        courses: [],
        student: students[10],
    }),
    new ISP({
        id: 12,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 25,
        startYear: 2020,
        courses: [],
        student: students[11],
    }),
    new ISP({
        id: 13,
        status: IspStatus.SUBMITTED,
        totalCredits: 40,
        startYear: 2023,
        courses: [],
        student: students[12],
    }),
    new ISP({
        id: 14,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 30,
        startYear: 2021,
        courses: [],
        student: students[13],
    }),
    new ISP({
        id: 15,
        status: IspStatus.SUBMITTED,
        totalCredits: 20,
        startYear: 2022,
        courses: [],
        student: students[14],
    }),
    new ISP({
        id: 16,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 35,
        startYear: 2020,
        courses: [],
        student: students[15],
    }),
    new ISP({
        id: 17,
        status: IspStatus.SUBMITTED,
        totalCredits: 40,
        startYear: 2021,
        courses: [courses[16]],
        student: students[0],
    }),
    new ISP({
        id: 18,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 25,
        startYear: 2022,
        courses: [courses[17]],
        student: students[1],
    }),
    new ISP({
        id: 19,
        status: IspStatus.SUBMITTED,
        totalCredits: 30,
        startYear: 2023,
        courses: [courses[18]],
        student: students[2],
    }),
    new ISP({
        id: 20,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 15,
        startYear: 2020,
        courses: [courses[19]],
        student: students[3],
    }),
    new ISP({
        id: 21,
        status: IspStatus.SUBMITTED,
        totalCredits: 30,
        startYear: 2021,
        courses: [courses[20]],
        student: students[4],
    }),
    new ISP({
        id: 22,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 20,
        startYear: 2022,
        courses: [courses[21]],
        student: students[5],
    }),
    new ISP({
        id: 23,
        status: IspStatus.SUBMITTED,
        totalCredits: 35,
        startYear: 2023,
        courses: [courses[22]],
        student: students[6],
    }),
    new ISP({
        id: 24,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 30,
        startYear: 2021,
        courses: [courses[23]],
        student: students[7],
    }),
    new ISP({
        id: 25,
        status: IspStatus.SUBMITTED,
        totalCredits: 40,
        startYear: 2022,
        courses: [courses[24]],
        student: students[8],
    }),
    new ISP({
        id: 26,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 25,
        startYear: 2020,
        courses: [courses[25]],
        student: students[9],
    }),
    new ISP({
        id: 27,
        status: IspStatus.SUBMITTED,
        totalCredits: 30,
        startYear: 2023,
        courses: [courses[26]],
        student: students[10],
    }),
    new ISP({
        id: 28,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 40,
        startYear: 2022,
        courses: [courses[27]],
        student: students[11],
    }),
    new ISP({
        id: 29,
        status: IspStatus.SUBMITTED,
        totalCredits: 20,
        startYear: 2021,
        courses: [courses[28]],
        student: students[12],
    }),
    new ISP({
        id: 30,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 35,
        startYear: 2020,
        courses: [courses[29]],
        student: students[13],
    }),
    new ISP({
        id: 31,
        status: IspStatus.SUBMITTED,
        totalCredits: 30,
        startYear: 2023,
        courses: [courses[0]],
        student: students[14],
    }),
    new ISP({
        id: 32,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 25,
        startYear: 2021,
        courses: [courses[1]],
        student: students[15],
    }),
    new ISP({
        id: 33,
        status: IspStatus.SUBMITTED,
        totalCredits: 20,
        startYear: 2022,
        courses: [courses[2]],
        student: students[0],
    }),
    new ISP({
        id: 34,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 30,
        startYear: 2023,
        courses: [courses[3]],
        student: students[1],
    }),
    new ISP({
        id: 35,
        status: IspStatus.SUBMITTED,
        totalCredits: 40,
        startYear: 2020,
        courses: [courses[4]],
        student: students[2],
    }),
    new ISP({
        id: 36,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 30,
        startYear: 2021,
        courses: [courses[5]],
        student: students[3],
    }),
    new ISP({
        id: 37,
        status: IspStatus.SUBMITTED,
        totalCredits: 25,
        startYear: 2022,
        courses: [courses[6]],
        student: students[4],
    }),
    new ISP({
        id: 38,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 20,
        startYear: 2023,
        courses: [courses[7]],
        student: students[5],
    }),
    new ISP({
        id: 39,
        status: IspStatus.SUBMITTED,
        totalCredits: 35,
        startYear: 2020,
        courses: [courses[8]],
        student: students[6],
    }),
    new ISP({
        id: 40,
        status: IspStatus.NOTSUBMITTED,
        totalCredits: 30,
        startYear: 2021,
        courses: [courses[9]],
        student: students[7],
    }),
];

export default isps;
