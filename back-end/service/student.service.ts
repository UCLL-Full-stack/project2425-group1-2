import { Student } from '../model/student';
import StudentRepository from '../repository/student.db';

const getStudentById = (id: number): Student => {
    let res: Student | null = StudentRepository.findById(id);
    if (res === null) {
        throw new Error(ERROR_STUDENT_NOT_EXIST);
    }
    return res;
}

const getAllByPassedCourseId = (courseId: number) : Student[] => {
    return StudentRepository.findAllByPassedCourseId(courseId);
}

const ERROR_STUDENT_NOT_EXIST = `This student does not exist`;

export default {
    getStudentById,
    getAllByPassedCourseId,
}