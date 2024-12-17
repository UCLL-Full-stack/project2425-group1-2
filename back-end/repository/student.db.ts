import {Student} from '../model/student';
import students from '../data/students';
import tryCatcher from '../util/tryCatchWrapper';
import prisma from './prisma/prismaClient';
import { Prisma, UserTypes } from '@prisma/client';

let DBstudents: Student[] = students;

const findAllByPassedCourseId = tryCatcher((id: number): Student[] => {
    return DBstudents.filter(student => student.passedCourses.some(course => course.id === id));
});

const getAllStudents = async(): Promise<Student[]> => {
    try{
        const studentsPrisma = await prisma.user.findMany({
            where:{userType: UserTypes.STUDENT}
        });

        return studentsPrisma.map((studentPrisma) => Student.from(studentPrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details. ');
    }
}

const getStudentById = async (id: number): Promise<Student | null> => {
    try {
        const studentPrisma = await prisma.user.findUnique({
            where: { id,
                userType: UserTypes.STUDENT,
             },
        });

        if (studentPrisma === null) {
            throw new Error("No student exists with this id.") 
        }

        return Student.from(studentPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const getStudentByEmail = async (email: string): Promise<Student | null> => {
    try {
        const studentPrisma = await prisma.user.findUnique({
            where: {email,
                userType: UserTypes.STUDENT,
             },
        });

        if (studentPrisma === null) {
            throw new Error("No student exists with this id.") 
        }

        return Student.from(studentPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};
const getAllStudentsShortForm = async(): Promise<string[]> => {
    try{
        const studentsPrisma = await prisma.user.findMany({
            where: {
                userType: UserTypes.STUDENT, 
            },
            select: {
                name: true, 
            },
        });

        return studentsPrisma.map(student => student.name);
    }
    catch (error){
        throw new Error('Database error. See server log for details.');    }
}


const addStudent = async (studentData: Partial<Student>): Promise<Student> => {
    if (!studentData.name || !studentData.email || !studentData.password) {
        throw new Error("Required fields: 'name', 'email', and 'password' must be provided and cannot be empty.");
    }

    try {

        const existingStudent = await prisma.user.findUnique({
            where: { email: studentData.email },
        });

        if (existingStudent) {
            console.log(`Student with email ${studentData.email} already exists.`);
            throw new Error("A student with this email already exists.");
        }

        const prismaStudentData = {
            name: studentData.name,
            email: studentData.email,
            password: studentData.password,
            nationality: studentData.nationality ?? "Unknown",
            userType: UserTypes.STUDENT,
        };

        const createdStudent = await prisma.user.create({
            data: prismaStudentData,
        });

        console.log("Student successfully created:", createdStudent);

        return Student.from(createdStudent);

    } catch (error) {
        console.log(error);
        throw new Error("Database error. Could not add student.");
    }
};

const deleteStudentById = async (id: number): Promise<boolean> => {
    try {
        const student = await prisma.user.delete({
            where: {
                id,
                userType: UserTypes.STUDENT,
            },

        });

        return student ? true : false;
    } catch (error) {
        console.log(error);
        throw new Error("Database error. Could not delete student.");
    }
};


export default {
    findAllByPassedCourseId,
    getAllStudents,
    getStudentById,
    addStudent,
    getAllStudentsShortForm,
    deleteStudentById,
    getStudentByEmail
};