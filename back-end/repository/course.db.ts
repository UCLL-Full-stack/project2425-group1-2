import prismaClient from './prisma/prismaClient';
import tryCatcher from '../util/tryCatchWrapper';
import { Course } from '../model/course';
import { CourseUpdateView, CourseShortView } from '../types/coursesDTO';

const findAll = tryCatcher(async (): Promise<Course[]> => {
    let result = await prismaClient.course.findMany();
    return result.map(Course.from);
});

const findAllShort = tryCatcher(async (): Promise<CourseShortView[]> => {
    const result = await prismaClient.course.findMany({
        select: {
            id: true,
            name: true,
            phase: true,
            credits: true,
        },
    });
    return result;
});

const findById = tryCatcher(async (id: number): Promise<Course> => {
    const course = await prismaClient.course.findUnique({
        where: { id },
    });
    if (!course) {
        throw new Error(ERROR_COURSE_NOT_EXIST);
    }
    return Course.from(course);
});

const findAllShortByPhaseAndPassedCourses = tryCatcher(async (phases: number[], passedCourseIds: number[]): Promise<CourseShortView[]> => {
    const courses = await prismaClient.course.findMany({
        select: {
            id: true,
            name: true,
            phase: true,
            credits: true,
        },
        where: {
            phase: { in: phases },
            AND: [
                {
                    requiredPassedCourses: {
                        every: {
                            requiredCourseId: { in: passedCourseIds },
                        },
                    },
                },
            ],
        },
    });

    return courses;
});

const existsById = tryCatcher(async (id: number): Promise<boolean> => {
    const existingCourse = await prismaClient.course.findUnique({
        where: { id },
    });

    return !!existingCourse;
});

const existsByNameAndPhase = tryCatcher(async (name: string, phase: number): Promise<boolean> => {
    const existingCourse = await prismaClient.course.findUnique({
        where: {
            name_phase: {
                name,
                phase,
            },
        },
    });

    return !!existingCourse;
});

const isRequiredByAnotherCourse = tryCatcher((courseId: number): Promise<boolean> => {
    return prismaClient.courseRequiredPassedCourses.findFirst({
        where: {
            requiredCourseId: courseId,
        },
    }).then(course => !!course);
});

const create = tryCatcher(async (courseInfo: CourseUpdateView): Promise<Course> => {
    const course = await prismaClient.course.create({
        data: {
            name: courseInfo.name,
            description: courseInfo.description,
            phase: courseInfo.phase,
            credits: courseInfo.credits,
            lecturers: courseInfo.lecturers,
            isElective: courseInfo.isElective,
        },
    });
    await prismaClient.courseRequiredPassedCourses.createMany({
        data: courseInfo.requiredPassedCourses.map(courseId => ({
            courseId: course.id,
            requiredCourseId: courseId,
        })),
    });

    return Course.from(course);
});


const update = tryCatcher(async (id: number, courseUpdateInfo: CourseUpdateView): Promise<Course> => {
    const updatedCourse = await prismaClient.course.update({
        where: { id },
        data: {
            name: courseUpdateInfo.name,
            description: courseUpdateInfo.description,
            lecturers: courseUpdateInfo.lecturers,
            isElective: courseUpdateInfo.isElective,
        },
    });

    await prismaClient.courseRequiredPassedCourses.deleteMany({
        where: {
            courseId: id,
        },
    });

    await prismaClient.courseRequiredPassedCourses.createMany({
        data: courseUpdateInfo.requiredPassedCourses.map(courseId => ({
            courseId: id,
            requiredCourseId: courseId,
        })),
    });
    
    return Course.from(updatedCourse);
});

const deleteAllById = tryCatcher(async (ids: number[]): Promise<string> => {
    await prismaClient.course.deleteMany({
        where: {
            id: { in: ids },
        },
    });

    return 'Courses are successfully deleted';
});

const ERROR_COURSE_NOT_EXIST = 'This course does not exist';

export default {
    findAll,
    findAllShort,
    findById,
    findAllShortByPhaseAndPassedCourses,
    existsById,
    existsByNameAndPhase,
    isRequiredByAnotherCourse,
    create,
    update,
    deleteAllById,
};

export const errorMessages = {
    ERROR_COURSE_NOT_EXIST,
};
