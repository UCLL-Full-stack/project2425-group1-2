import prismaClient from './prisma/prismaClient'
import { tryCatchWrapper } from '../util/tryCatchWrapper';
import { Student } from '../model/student';
import { StudentIncludeCourses } from '../types/studentDTO';

const findById = tryCatchWrapper(async (id: number): Promise<StudentIncludeCourses> => {
    const student = await prismaClient.user.findUnique({
        where: { id },
        include: {
            courses: {
                select: {
                    courseId: true
                }
            }
        }
    });
    if (!student) {
        throw new Error(STUDENT_NOT_FOUND_ERROR);
    }
    return new StudentIncludeCourses(student);
});

const findAllByPassedCourseId = tryCatchWrapper(async (courseId: number): Promise<Student[]> => {
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
