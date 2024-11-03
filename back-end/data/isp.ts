import { ISP } from '../model/isp';
import students from '../data/students';
import courses from '../data/courses';

let isps: ISP[] = [
    new ISP({id: 1, status: 'active', totalCredits: 30, year: 2021, courses: [courses[2]], student: students[0]}),
    new ISP({id: 2, status: 'inactive', totalCredits: 20, year: 2020, courses: [], student: students[1]}),
    new ISP({id: 3, status: 'active', totalCredits: 25, year: 2022, courses: [], student: students[2]}),
    new ISP({id: 4, status: 'inactive', totalCredits: 15, year: 2019, courses: [], student: students[3]}),
    new ISP({id: 5, status: 'active', totalCredits: 35, year: 2023, courses: [], student: students[4]})
];

export default isps;