import { Course } from '../model/course';

const courses = [
    new Course({ id: 1, name: 'Introduction to Programming', description: 'Learn the basics of programming.', phase: 1, credits: 3, lecturers: ['Dr. Smith'], isElective: false, requiredPassedCourses: [] }),
    new Course({ id: 2, name: 'Data Structures', description: 'Understand data organization and manipulation.', phase: 2, credits: 4, lecturers: ['Prof. Johnson'], isElective: false, requiredPassedCourses: [] }),
    new Course({ id: 3, name: 'Operating Systems', description: 'Explore the principles of operating systems.', phase: 3, credits: 3, lecturers: ['Dr. Brown'], isElective: false, requiredPassedCourses: [] }),
    new Course({ id: 4, name: 'Database Systems', description: 'Learn about database design and management.', phase: 2, credits: 3, lecturers: ['Dr. White'], isElective: true, requiredPassedCourses: [] }),
    new Course({ id: 5, name: 'Artificial Intelligence', description: 'Introduction to AI concepts and techniques.', phase: 4, credits: 4, lecturers: ['Prof. Green'], isElective: true, requiredPassedCourses: [] }),
];

courses.push(new Course({ id: 6, name: 'Software Engineering', description: 'Learn about software development processes.', phase: 3, credits: 4, lecturers: ['Dr. Black'], isElective: false, requiredPassedCourses: [courses[0], courses[1]] }));

export default courses;