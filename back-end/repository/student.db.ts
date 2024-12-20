import {Student} from '../model/student';
import students from '../data/students';
import tryCatcher from '../util/tryCatchWrapper';
import prisma from './prisma/prismaClient';
import { Prisma, UserTypes } from '@prisma/client';
import { StudentShortView } from '../types/studentShortView';

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
const getAllStudentsShortForm = async (): Promise<StudentShortView[]> => {
    try {
        const students = await prisma.user.findMany({
            where: {
                userType: 'STUDENT', // Ensure this matches the userType value for students in your DB
            },
            select: {
                name: true, // Only fetch the name of the students
            },
        });

        return students.map(student => new StudentShortView(student)); // Return only the names of the students
    } catch (error) {
        console.error('Error fetching student names:', error);
        throw new Error('Database error. See server log for details.');
    }
};


const addStudent = async ({name,email,password,nationality}: Student): Promise<Student> => {
    try {
        const prismaStudentData = {
            name,
            email,
            password,
            nationality: nationality ?? "Unknown",
            userType: UserTypes.STUDENT,
        };

        const createdStudent = await prisma.user.create({
            data: prismaStudentData,
        });


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