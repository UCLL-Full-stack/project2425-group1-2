import { Course } from '../model/course';

const courses = [
    new Course({ id: 1, name: 'Introduction to Programming', phase: 1, credits: 3, lecturers: ['Dr. Smith'], isElective: false }),
    new Course({ id: 2, name: 'Data Structures', phase: 2, credits: 4, lecturers: ['Prof. Johnson'], isElective: false }),
    new Course({ id: 3, name: 'Operating Systems', phase: 3, credits: 3, lecturers: ['Dr. Brown'], isElective: false }),
    new Course({ id: 4, name: 'Database Systems', phase: 2, credits: 3, lecturers: ['Dr. White'], isElective: true }),
    new Course({ id: 5, name: 'Artificial Intelligence', phase: 4, credits: 4, lecturers: ['Prof. Green'], isElective: true }),
];

const findAll = (): Course[] => {
    try {
        return courses;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    findAll,
};
