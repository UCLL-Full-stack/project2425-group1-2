import { Student } from '../model/student';
import courses from './courses';

let students: Student[] = [
    new Student({
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123',
        nationality: 'American',
        passedCourses: [],
    }),
    new Student({
        id: 2,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'password123',
        nationality: 'British',
        passedCourses: [],
    }),
    new Student({
        id: 3,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: 'password123',
        nationality: 'Canadian',
        passedCourses: [],
    }),
    new Student({
        id: 4,
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        password: 'password123',
        nationality: 'Australian',
        passedCourses: [],
    }),
    new Student({
        id: 5,
        name: 'Ethan Hunt',
        email: 'ethan.hunt@example.com',
        password: 'password123',
        nationality: 'New Zealander',
        passedCourses: [courses[0]],
    }),
];

export default students;
