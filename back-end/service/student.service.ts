import { Student } from '../model/student';
import StudentRepository from '../repository/student.db';
import { Prisma } from '@prisma/client';
import { StudentInput } from '../types';
import studentDb from '../repository/student.db';

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

const addStudent = async ({user: UserInput, nationality,passedCourses: CourseInput[]}: StudentInput): Promise<Student> => {
    try{
        if (!UserInput.name || !UserInput.email || !Us.password) {
            throw new Error("Required fields: 'name', 'email', and 'password' must be provided and cannot be empty.");
        } else if(!StudentRepository.getStudentByEmail(user.email)){

        }
        return StudentRepository.addStudent({user, nationality,passedCourses});
    }catch{
        throw new Error("Student service error!")
    }
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