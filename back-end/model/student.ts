import { Course } from './course';
import { User } from './user';
import { PrismaStudent } from '../types/prismaTypesExtension';
import { Course as PrismaCourse } from '@prisma/client';
import { StudentShortView } from '../types/studentShortView';
export class Student extends User {
    public readonly nationality: string;
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
        this.nationality = student.nationality;
        this.passedCourses = student.passedCourses || [];
    }

    validates(student: { nationality: string;}) {
        if (!student.nationality || student.nationality.length=== 0){
            throw new Error("Nationality is required.")
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

    public static fromName({
        name
    }:PrismaStudent): StudentShortView{
        return new StudentShortView({
            name
        })
    }
}
