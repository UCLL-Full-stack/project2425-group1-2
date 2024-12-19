import { Student } from '../model/student';
import StudentRepository from '../repository/student.db';

const getStudentById = async (id: number): Promise<Student> => {
    let res: Student = await StudentRepository.findById(id);
    return res;
}

const getAllByPassedCourseId = (courseId: number) : Student[] => {
    return StudentRepository.findAllByPassedCourseId(courseId);
}

export default {
    getStudentById,
    getAllByPassedCourseId,
}