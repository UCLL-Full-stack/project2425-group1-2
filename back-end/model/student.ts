import { Course } from "./course";
import { User } from "./user";

export class Student extends User {
    public readonly nationality: string;
    public readonly startYear: number;
    public readonly passedCourses: Course[];

    constructor(student: { id: number; name: string; email: string; password: string; nationality: string; startYear: number; passedCourses: Course[] }) {
        super({
            id: student.id,
            name: student.name,
            email: student.email,
            password: student.password,
        });
        this.validates(student);
        this.nationality = student.nationality;
        this.startYear = student.startYear;
        this.passedCourses = student.passedCourses || [];
    }

    validates(student: { nationality: string; startYear: number;}) {
        if (!student.nationality || student.nationality.length=== 0){
            throw new Error("Nationality is required.")
        }
        if (!student.startYear) {
            throw new Error("Start year is required.")
        }
        if(student.startYear > 9999 || student.startYear <1000){
            throw new Error("Start year should be 4 digit.")
        }
    }

    equals(student: Student): boolean {
        return (
            this.id === student.id &&
            this.name === student.name &&
            this.email === student.email &&
            this.password === student.password &&
            this.nationality === student.nationality &&
            this.passedCourses.every((passedCourse,index)=> passedCourse.equals(student.passedCourses[index]))
        );
    }
}
