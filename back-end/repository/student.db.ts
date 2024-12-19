import prismaClient from './prisma/prismaClient'
import tryCatcher from '../util/tryCatchWrapper';
import { Student } from '../model/student';

const findById = tryCatcher(async (id: number): Promise<Student> => {
    const student = await prismaClient.user.findUnique({
        where: { id }
    });
    if (!student) {
        throw new Error(STUDENT_NOT_FOUND_ERROR);
    }
    return Student.from(student);
});

const findAllByPassedCourseId = tryCatcher(async (courseId: number): Promise<Student[]> => {
    const students = await prismaClient.user.findMany({
        where: {
            userType: 'STUDENT',
            courses: {
                some: {
                    courseId: courseId
                }
            }
        }
    });
    return students.map(Student.from);
});

const STUDENT_NOT_FOUND_ERROR = 'Student not found';

export default {
    findById,
    findAllByPassedCourseId,
};
