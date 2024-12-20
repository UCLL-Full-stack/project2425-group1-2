import prisma from '../repository/prisma/prismaClient';
import students from '../data/students';
import courses from '../data/courses';
import isps from '../data/isp';
import { ISP } from '../model/isp';
import { Student } from '../model/student';
import { Course } from '../model/course';

async function main() {
    try {
        // Clear existing data
        await prisma.course.deleteMany();
        await prisma.user.deleteMany();
        await prisma.isp.deleteMany();

        // Create students
        console.log('Seeding students...');
        for (const student of students) {
            await createStudent(student);
        }

        // Create courses
        console.log('Seeding courses...');
        for (const course of courses) {
            await createCourse(course);
        }

        // // Create ISPs
        // console.log('Seeding ISPs...');
        // for (const isp of isps) {
        //     await createISP(isp);
        // }

        console.log('Seeding completed!');
    } catch (error) {
        console.error('Error during seeding:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

async function createStudent(student: Student) {
    return prisma.user.upsert({
        where: { email: student.email },
        update: {},
        create: {
            name: student.name,
            email: student.email,
            password: student.password,
            userType: 'STUDENT',
            nationality: student.nationality,
            isps: {
                create: [], // Placeholder for associated ISPs
            },
            courses: {
                create: [], // Placeholder for associated courses
            },
            privileges: {
                create: [], // Placeholder for privileges
            },
        },
    });
}

// async function createISP(isp: ISP) {
//     // Map courses to the correct connection format
//     const validCourseConnections = isp.courses
//         .filter((course) => course.id !== undefined) // Exclude undefined IDs
//         .map((course) => ({ courseId: course.id!, ispId: isp.id })); // Map to unique input format

//     // Warn about excluded invalid entries
//     if (validCourseConnections.length !== isp.courses.length) {
//         console.warn(`Some courses for ISP ID ${isp.id} have invalid IDs and will be ignored.`);
//     }

//     // Upsert the ISP with validated courses
//     return prisma.isp.upsert({
//         where: { id: isp.id },
//         update: {},
//         create: {
//             totalCredits: isp.totalCredits,
//             startYear: isp.startYear,
//             status: isp.status,
//             student: {
//                 connect: { email: isp.student.email },
//             },
//             courses: {
//                 connect: validCourseConnections,
//             },
//         },
//     });
// }



async function createCourse(course: Course) {
    return prisma.course.upsert({
        where: { name_phase: { name: course.name, phase: course.phase } },
        update: {},
        create: {
            name: course.name,
            description: course.description,
            phase: course.phase,
            credits: course.credits,
            isElective: course.isElective,
            lecturers: {
                set: course.lecturers, // Array of lecturers
            },
            isps: {
                create: [], // Placeholder for associated ISPs
            },
            passedStudents: {
                create: [], // Placeholder for associated students
            },
        },
    });
}

// Run the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
