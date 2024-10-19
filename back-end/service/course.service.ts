import { Course } from '../model/course';
import CourseRepository from '../repository/course.db';

const getAll = () : Course[] => {
    return CourseRepository.findAll();
}

export default {
    getAll
};