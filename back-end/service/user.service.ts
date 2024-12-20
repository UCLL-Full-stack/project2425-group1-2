import { User } from '../model/user';
import UserRepository from '../repository/user.db';

const getUserByEmail = async (email: string): Promise<User> => {
    return await UserRepository.findByEmail(email);
};

export default {
    getUserByEmail,
};
