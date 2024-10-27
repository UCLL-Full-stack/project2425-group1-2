import prisma from './prismaClient'
import students from '../../data/students'
import courses from '../../data/courses'
import isp from '../../data/isp'
import { ISP } from '../../model/isp';
import { Student } from '../../model/student';
import { Course } from '../../model/course';
async function main() {
    students.forEach(async (student) => {
        await createStudent(student);
    });

    courses.forEach(async (course) => {
        await createCourse(course);
    });

    isp.forEach(async (isp) => {
        await createISP(isp);
    });
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
            create: [],
        },
        courses: {
            create: [],
        },
        privileges: {
            create: [],
        },
        }});
}

async function createISP(isp: ISP) {
    return prisma.isp.upsert({
        where: { id: isp.id },
        update: {},
        create: {
        totalCredits: isp.totalCredits,
        startYear: isp.startYear,
        status: isp.status,
        student: {
            connect: { email: isp.student.email },
        },
        courses: {
            create: [],
        },
        }});
}

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
            set: course.lecturers,
        },
        isps: {
            create: [],
        },
        passedStudents: {
            create: [],
        },
        },
    });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })