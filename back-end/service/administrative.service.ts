import { Administrative } from "../model/administrative";
import administrativeDb from "../repository/administrative.db";

const getAllAdmins = async(): Promise<Administrative[]> => {
    try{
        const allAdmins = administrativeDb.getAllAdmins();
        if (!allAdmins) {
            throw new Error("There are no admins in database.")
        }
        return allAdmins;
    } catch(error) {
        throw new Error("Student service error!")
    }
}

const getAdminById = async(id:number): Promise<Administrative|null> => {
    try{
        const allAdmins = administrativeDb.getAdminById(id);
        if (!allAdmins) {
            throw new Error("There are no admins in database.")
        }
        return allAdmins;
    } catch(error) {
        throw new Error("Student service error!")
    }
}
const deleteAdminById= async(id: number): Promise<boolean> =>{
    try{
        const adminExist = getAdminById(id);
        if (!adminExist) {
            throw new Error("User doesn't exists")
        }
        return administrativeDb.deleteAdminById(id);
    } catch(error) {
        throw new Error("Service error!")
    }
}
export default{
    getAllAdmins,
    getAdminById,
    deleteAdminById
}