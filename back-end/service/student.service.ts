import { Student } from '../model/student';
import StudentRepository from '../repository/student.db';
import { Prisma } from '@prisma/client';
import { StudentInput } from '../types';
import studentDb from '../repository/student.db';
import { StudentShortView } from '../types/studentShortView';

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

// const addStudent = async ({name, email,password,nationality}: StudentInput): Promise<Student> => {
//     try{
//         if (!name || !email || !password|| !nationality) {
//             throw new Error("Required fields: 'name', 'email', 'password' and 'nationality' must be provided and cannot be empty.");
//         }
//         return StudentRepository.addStudent({name, email, password, nationality});
//     }catch{
//         throw new Error("Student service error!")
//     }
// };

const getAllStudentsShortForm = async (): Promise<StudentShortView[]> => {
    try {
        const students = await StudentRepository.getAllStudentsShortForm();  // Assuming this returns a list of students
        if (!students){
            throw new Error("Database for students is empty")
        }
        return students
    } catch (error) {
        console.error('Error fetching students:', error);
        throw new Error('Error fetching students. See server log for details.');
    }
};
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
    // addStudent,
    getAllStudentsShortForm,
    deleteStudentById
}