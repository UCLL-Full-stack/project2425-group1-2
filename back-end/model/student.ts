import { Course } from './course';
import { User } from './user';
import { PrismaStudent } from '../types/prismaTypesExtension';
import { Course as PrismaCourse } from '@prisma/client';
export class Student extends User {
    private readonly _nationality: string;
    private readonly _passedCourses: Course[];
    public readonly nationality: string;
    public readonly startYear: number;
    public readonly passedCourses: Course[];

    constructor(student: {
        id: number;
        name: string;
        email: string;
        password: string;
        nationality: string;
        passedCourses: Course[];
    }) {
        super({
            id: student.id,
            name: student.name,
            email: student.email,
            password: student.password,
        });
        this.validates(student);
        this._nationality = student.nationality;
        this._passedCourses = student.passedCourses || [];
        this.nationality = student.nationality;
        this.startYear = student.startYear;
        this.passedCourses = student.passedCourses || [];
    }

    validates(student: { nationality: string;}) {
        if (!student.nationality || student.nationality.length=== 0){
            throw new Error("Nationality is required.")
        }
    }

    get nationality(): string {
        return this._nationality;
    }


    get passedCourses(): Course[] {
        return this._passedCourses;
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

    public static fromIncludeAll({
        id,
        name,
        email,
        password,
        nationality,
        passedCourses,
    }: PrismaStudent & { passedCourses: PrismaCourse[] }): Student {
        return new Student({
            id,
            name,
            email,
            password,
            nationality,
            passedCourses: passedCourses.map(Course.from)
        });
    }

    public static from({
        id,
        name,
        email,
        password,
        nationality
    }: PrismaStudent): Student {
        return new Student({
            id,
            name,
            email,
            password,
            nationality,
            passedCourses: []
        });
    }
}
