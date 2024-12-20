import { Privilege } from '../model/privilege';
import PrivilegeRepository from '../repository/privilege.db';

const getAllPrivileges = async (): Promise<Privilege[]> => {
    return await PrivilegeRepository.findAll();
};

const privilegeService = {
    getAllPrivileges
};

export default privilegeService;
