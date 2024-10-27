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
        courses: [courses[2]],
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
];

export default isps;
