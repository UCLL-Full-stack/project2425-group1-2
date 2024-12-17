import { id } from 'date-fns/locale';
import { Student } from '../model/student';
import StudentRepository from '../repository/student.db';
import { Prisma } from '@prisma/client';

const getAllByPassedCourseId = (courseId: number) : Student[] => {
    return StudentRepository.findAllByPassedCourseId(courseId);
}

const getAllStudents = async(): Promise<Student[]> => {
    try{
        const allStudents = StudentRepository.getAllStudents()
        if (!allStudents) {
            throw new Error("There are no students in database.")
        }
        return allStudents;
    } catch(error) {
        throw new Error("Student service error!")
    }
}

const getStudentById = async(id : number): Promise<Student|null> => {
    try{
        const studentPrisma = StudentRepository.getStudentById(id);
        if (studentPrisma === null) {
            throw new Error("No student exists with this id.") 
        }
    return StudentRepository.getStudentById(id);
    } catch(error){
        throw new Error("Student service error!")
    }
}

const addStudent = async (student: Partial<Student>): Promise<Student> => {
    return StudentRepository.addStudent(student);
};

const getAllStudentsShortForm = async(): Promise<string[]> =>{
    return StudentRepository.getAllStudentsShortForm();
}
const deleteStudentById= async(id: number): Promise<boolean> =>{
    try{
        const userExist = getStudentById(id);
        if (!userExist) {
            throw new Error("User doesn't exists")
        }
        return StudentRepository.deleteStudentById(id);
    } catch(error) {
        throw new Error("Service error!")
    }
}


export default {
    getAllByPassedCourseId,
    getAllStudents,
    getStudentById,
    addStudent,
    getAllStudentsShortForm,
    deleteStudentById
}