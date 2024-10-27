import { IspStatus } from "@prisma/client";
import { Course } from "./course";
import { Student } from "./student";

export class ISP {
    public readonly id?: number;
    public readonly status: string;
    public readonly totalCredits: number;
    public readonly year: number;
    public readonly courses: Course[];
    public readonly student: Student;

    constructor(isp: {
        id: number;
        status: IspStatus;
        totalCredits: number;
        year: number;
        courses: Course[];
        student: Student;
    }) {
        this.validate(isp);
        this.id = isp.id;
        this.status = isp.status;
        this.totalCredits = isp.totalCredits;
        this.year = isp.year;
        this.courses = isp.courses ||[];
        this.student = isp.student;
    }

    validate(isp: { status: string; totalCredits: number; year: number; student: Student;}) {
        if (!isp.status || isp.status.length=== 0){
            throw new Error("Description is required.")
        }
        if (!isp.totalCredits || isp.totalCredits <= 0) {
            throw new Error("Credits are required and cannot be negative")
        }
        if (!isp.year) {
            throw new Error("Start year is required.")
        }
        if(isp.year > 9999 || isp.year <1000){
            throw new Error("Start year should be 4 digit.")
        }
        if(!isp.student) {
            throw new Error("Student is required.")
        }
    }


    public equals(isp: ISP): boolean {
        return (
            this.id === isp.id &&
            this.status === isp.status &&
            this.totalCredits === isp.totalCredits &&
            this.year === isp.year &&
            this.courses.length === isp.courses.length &&
            this.courses.every((course, index) => course.equals(isp.courses[index]))
        );
    }
}
