import { Student } from '../model/student';
import StudentRepository from '../repository/student.db';

const getStudentById = async (id: number): Promise<Student> => {
    let res: Student = await StudentRepository.findById(id);
    return res;
}

const getAllByPassedCourseId = async (courseId: number) : Promise<Student[]> => {
    return await StudentRepository.findAllByPassedCourseId(courseId);
}

export default {
    getStudentById,
    getAllByPassedCourseId,
}