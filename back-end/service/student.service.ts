import { Student } from '../model/student';
import StudentRepository from '../repository/student.db';

const getAllByPassedCourseId = (courseId: number) : Student[] => {
    return StudentRepository.findAllByPassedCourseId(courseId);
}

export default {
    getAllByPassedCourseId,
}