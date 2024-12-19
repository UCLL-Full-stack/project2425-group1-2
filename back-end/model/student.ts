import { Course as PrismaCourse } from '@prisma/client';
import { PrismaStudent } from '../types/prismaTypesExtension';
import { Course } from './course';
import { User } from './user';
export class Student extends User {
    public readonly nationality: string;
    public readonly studyYear: number;
    public readonly passedCourses: Course[];

    constructor(student: {
        id: number;
        name: string;
        email: string;
        password: string;
        nationality: string;
        studyYear: number;
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
        this.studyYear = student.studyYear;
        this.passedCourses = student.passedCourses || [];
    }

    validates(student: {
        id: number;
        name: string;
        email: string;
        password: string;
        nationality: string;
        studyYear: number;
        passedCourses: Course[];
    }): void {
        if (!student.nationality || student.nationality.length === 0) {
            throw new Error('Nationality is required.');
        }
        if (student.studyYear < 1) {
            throw new Error('Study year must be more than 0.');
        }
    }

    equals(student: Student): boolean {
        return (
            this.id === student.id &&
            this.name === student.name &&
            this.email === student.email &&
            this.password === student.password &&
            this.nationality === student.nationality &&
            this.passedCourses.every((passedCourse, index) =>
                passedCourse.equals(student.passedCourses[index])
            )
        );
    }

    public static fromIncludeAll({
        id,
        name,
        email,
        password,
        nationality,
        studyYear,
        passedCourses,
    }: PrismaStudent & { passedCourses: PrismaCourse[] }): Student {
        return new Student({
            id,
            name,
            email,
            password,
            nationality,
            studyYear,
            passedCourses: passedCourses.map(Course.from),
        });
    }

    public static from({ id, name, email, password, nationality, studyYear }: PrismaStudent): Student {
        return new Student({
            id,
            name,
            email,
            password,
            nationality,
            studyYear,
            passedCourses: [],
        });
    }
}
