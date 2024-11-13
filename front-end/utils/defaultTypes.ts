import { CourseUpdateView, CreateISPView, ISPStatus, StudentUpdateView } from "@/types";

const currentYear = new Date().getFullYear();

export const getDefaultISP = (): CreateISPView => ({
    status: ISPStatus.NOTSUBMITTED,
    totalCredits: 60,
    startYear: currentYear,
    courses: [],
    studentId: -1
});

export const getDefaultStudent = (): StudentUpdateView => ({
    name: '',
    email: '',
    password: '',
    nationality: '',
    passedCourses: []
});

export const getDefaultCourse = (): CourseUpdateView => ({
    name: '',
    description: '',
    phase: 1,
    credits: 1,
    lecturers: [],
    isElective: false,
    requiredPassedCourses: []
});