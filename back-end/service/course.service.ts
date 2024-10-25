import { Course } from '../model/course';
import CourseRepository from '../repository/course.db';
import CourseShortView from '../types/courseShortView';

const getAll = () : Course[] => {
    return CourseRepository.findAll();
}

const getAllShort = () : CourseShortView[] => {
    return CourseRepository.findAll().map((course:any) => {
        return new CourseShortView(course);
    });
}

const getCourseById = (id: number): Course => {
    let res: Course | null = CourseRepository.findById(id);
    if (res === null) {
        throw new Error(`Course with id ${id} does not exist`);
    }
    return res;
}

const deleteCourses = (ids: number[]) : String => {
    ids.forEach(id => {
        throwErrorIfNotExist(id);
        throwErrorIfRequiredInIsp(id);
        throwErrorIfPassedByStudent(id);
    });
    CourseRepository.deleteCourses(ids);
    return "Courses are successfully deleted";
}

const throwErrorIfNotExist = (id: number) : void => {
    let res: Course | null = CourseRepository.findById(id);
    if (res === null) {
        throw new Error(`Course with id ${id} does not exist`);
    }
}

const throwErrorIfRequiredInIsp = (id: number) : void => {

}

const throwErrorIfPassedByStudent = (id: number) : void => {

}

export default {
    getAll,
    getAllShort,
    getCourseById,
    deleteCourses,
};