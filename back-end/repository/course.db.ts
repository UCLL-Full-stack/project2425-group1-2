import { Course } from '../model/course';
import courses from '../data/courses';
import DBtryCatcher from '../util/tryCatchWrapper';

let DBcourses: Course[] = Array.from(courses);

const initDb = (): void => {
    DBcourses = Array.from(courses);
};

const findAll = DBtryCatcher((): Course[] => {
    return DBcourses;
});

const findById = DBtryCatcher((id: number): Course | null => {
    return DBcourses.find(course => course.id === id) || null;
});

const findAllByRequiredCourseId = DBtryCatcher((id: number): Course[] => {
    return DBcourses.filter(course => course.requiredPassedCourses.some(requiredCourse => requiredCourse.id === id));
});

const findByNameAndPhase = DBtryCatcher((name: string, phase: number): Course | null => {
    return DBcourses.find(course => course.name === name && course.phase === phase) || null;
});

const deleteCourses = DBtryCatcher((ids: number[]): void => {
    DBcourses = DBcourses.filter(course => course.id && !ids.includes(course.id));
});

const save = DBtryCatcher((course: Course): Course => {
    if (course.id == undefined) {
        course = new Course({
            id: DBcourses.length + 1,
            name: course.name,
            description: course.description,
            phase: course.phase,
            credits: course.credits,
            lecturers: course.lecturers,
            isElective: course.isElective,
            requiredPassedCourses: course.requiredPassedCourses,
        });
    }
    const index = DBcourses.findIndex(c => c.id === course.id);
    if (index === -1) {
        DBcourses.push(course);
        return course;
    }
    DBcourses[index] = course;
    return course;
});

export default {
    initDb,
    findAll,
    findById,
    findAllByRequiredCourseId,
    findByNameAndPhase,
    save,
    deleteCourses,
};
