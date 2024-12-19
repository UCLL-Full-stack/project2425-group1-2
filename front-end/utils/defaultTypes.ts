import { Admin, Course, ISP, ISPStatus, Privilege, PrivilegeType, Role, Student } from "@/types";

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
    role: Role.STUDENT,
    passedCourses: [],
    studyYear: 1
});

export const getDefaultAdmin = (): Admin => ({
    id: -1,
    name: '',
    email: '',
    password: '',
    role: Role.ADMIN,
    privileges: []
});

export const getDefaultPrivilege = (): Privilege => ({
    id: -1,
    name: -1,
    description: ''
});

export const getDefaultCourse = (): Course => ({
    id: -1,
    name: '',
    description: '',
    phase: 1,
    credits: 0,
    lecturers: [],
    isElective: false,
    requiredPassedCourses: []
});