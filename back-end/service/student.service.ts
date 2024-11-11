import { id } from 'date-fns/locale';
import { Student } from '../model/student';
import StudentRepository from '../repository/student.db';
import { Prisma } from '@prisma/client';

const getAllByPassedCourseId = (courseId: number) : Student[] => {
    return StudentRepository.findAllByPassedCourseId(courseId);
}

const getAllStudents = async(): Promise<Student[]> => {
    return StudentRepository.getAllStudents();
}

const getStudentById = async(id : number): Promise<Student|null> => {
    return StudentRepository.getStudentById(id);
}

const addStudent = async (student: Partial<Student>): Promise<Student> => {
    return StudentRepository.addStudent(student);
};

const getAllStudentsShortForm = async(): Promise<string[]> =>{
    return StudentRepository.getAllStudentsShortForm();
}
const deleteStudentById= async(id: number): Promise<boolean> =>{
    return StudentRepository.deleteStudentById(id);
}


export default {
    getAllByPassedCourseId,
    getAllStudents,
    getStudentById,
    addStudent,
    getAllStudentsShortForm,
    deleteStudentById
}