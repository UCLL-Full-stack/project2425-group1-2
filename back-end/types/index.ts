type userType = 'STUDENT' | 'ADMINISTRATIVE'
type ispStatus = 'NOTSUBMITTED'| 'SUBMITTED'

type CourseInput = {
    id?: number;
    name: string;
    description: string;
    phase: number;
    credits: number;
    lecturers: string[];
    isElective: boolean;
    requiredPassedCourses:CourseInput[];
};

type PrivilegeInput = {
    id?: number;
    name: string;
    description: string;
}

type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    userType: userType;
};

type StudentInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    nationality: string;
    passedCourses?: CourseInput[];
};

type AdministrativeInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    privileges: PrivilegeInput[];

};

type IspInput = {
    id?: number;
    status: ispStatus;
    totalCredits: number;
    startYear: number;
    courses: CourseInput[];
    student: StudentInput;
};

type InvoiceInput = {
    id?: number;
    totalAmount: number;
    deadline: Date;
    paidAmount: number;
    isp: IspInput;
};

export{
    userType,
    ispStatus,
    CourseInput,
    PrivilegeInput,
    UserInput,
    StudentInput,
    AdministrativeInput,
    IspInput,
    InvoiceInput
}