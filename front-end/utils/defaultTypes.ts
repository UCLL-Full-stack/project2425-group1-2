import { Course, ISP, ISPStatus, Student } from "@/types";

const currentYear = new Date().getFullYear();

export const getDefaultISP = (): ISP => ({
    id: -1,
    status: ISPStatus.NOTSUBMITTED,
    totalCredits: 60,
    startYear: currentYear,
    courses: [],
    student: { id: -1, name: '' }
});

export const getDefaultStudent = (): Student => ({
    id: -1,
    name: '',
    email: '',
    password: '',
    nationality: '',
    passedCourses: []
});

export const getDefaultCourse = (): Course => ({
    id: -1,
    name: '',
    description: '',
    phase: 1,
    credits: 1,
    lecturers: [],
    isElective: false,
    requiredPassedCourses: []
});