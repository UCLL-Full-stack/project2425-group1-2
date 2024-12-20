import { UserTypes } from "@prisma/client";
import { Administrative } from "../model/administrative";
import prisma from "./prisma/prismaClient";


const getAllAdmins = async (): Promise<Administrative[]> => {
    try {
        // Use await and include privileges with their proper fields
        const adminsPrisma = await prisma.user.findMany({
            where: { userType: UserTypes.ADMINISTRATIVE },
            include: {
                privileges: {
                    select: {
                        privilege: {
                            select: {
                                id: true,
                                name: true,
                                description: true
                            }
                        }
                    }
                }
            }
        });

        // Map over the result and use the from method to convert to Administrative instances
        return adminsPrisma.map((adminPrisma) => {
            const privileges = adminPrisma.privileges.map((privilegeRel) => privilegeRel.privilege);
            return Administrative.from({ ...adminPrisma, privileges });
        });
    } catch (error) {
        console.error(error);
        throw new Error("Database error. Check log for details");
    }
};

// administrativeService.ts or wherever you handle the admin query
const getAdminById = async (id: number): Promise<Administrative | null> => {
    try {
        // Fetch the admin and include the privileges correctly
        const adminPrisma = await prisma.user.findUnique({
            where: { id, userType: UserTypes.ADMINISTRATIVE },
            include: {
                privileges: {
                    select: {
                        privilege: { // This is the relation to Privilege
                            select: {
                                id: true,
                                name: true,
                                description: true
                            }
                        }
                    }
                }
            }
        });

        if (!adminPrisma) {
            throw new Error("Admin by this id does not exist");
        }

        // Flatten the privileges array
        const flattenedPrivileges = adminPrisma.privileges.map(priv => priv.privilege);

        // Map the result to an Administrative instance
        return Administrative.from({
            id: adminPrisma.id,
            name: adminPrisma.name,
            email: adminPrisma.email,
            password: adminPrisma.password,
            privileges: flattenedPrivileges, // Pass the flattened privileges
        });
    } catch (error) {
        console.error(error);
        throw new Error("Database error. Check log for details");
    }
};

const deleteAdminById = async (id: number): Promise<boolean> => {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            // Delete associated privileges from the AdministrativePrivilege table
            await prisma.administrativePrivilege.deleteMany({
                where: {
                    adminId: id,
                },
            });

            // Delete the administrative user from the User table
            const deletedAdmin = await prisma.user.delete({
                where: {
                    id: id,
                    userType: UserTypes.ADMINISTRATIVE, // Ensure we're deleting an administrative user
                },
            });

            return deletedAdmin;
        });

        // If the result is not null, the deletion was successful
        return result ? true : false;
    } catch (error) {
        console.error("Error deleting admin:", error);
        return false; // Return false if there was an error during the process
    }
};

export default{
    getAllAdmins,
    getAdminById,
    deleteAdminById
}
