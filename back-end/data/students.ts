import { Student } from '../model/student';
import courses from './courses';
import { nationalities } from '../util/nationalities';

let students: Student[] = [
    new Student({
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123',
        nationality: nationalities[3], // American
        passedCourses: [],
        studyYear: 1,
    }),
    new Student({
        id: 2,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'password123',
        nationality: nationalities[25], // British
        passedCourses: [],
        studyYear: 2,
    }),
    new Student({
        id: 3,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: 'password123',
        nationality: nationalities[34], // Canadian
        passedCourses: [],
        studyYear: 3,
    }),
    new Student({
        id: 4,
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        password: 'password123',
        nationality: nationalities[9], // Australian
        passedCourses: [],
        studyYear: 4,
    }),
    new Student({
        id: 5,
        name: 'Ethan Hunt',
        email: 'ethan.hunt@example.com',
        password: 'password123',
        nationality: nationalities[122], // New Zealander
        passedCourses: [courses[0]],
        studyYear: 5,
    }),
];

export default students;
