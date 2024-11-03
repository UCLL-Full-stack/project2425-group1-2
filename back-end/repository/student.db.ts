import {Student} from '../model/student';
import students from '../data/students';
import tryCatcher from '../util/tryCatchWrapper';

let DBstudents: Student[] = students;

const findAllByPassedCourseId = tryCatcher((id: number): Student[] => {
    return DBstudents.filter(student => student.passedCourses.some(course => course.id === id));
});

export default {
    findAllByPassedCourseId,
};