import prismaClient from './prisma/prismaClient';
import { tryCatchWrapper } from '../util/tryCatchWrapper';
import { UserView } from '../types/userDTO';

const findByEmail = tryCatchWrapper(async (email: string): Promise<UserView> => {
    const user = await prismaClient.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error(ERROR_USER_NOT_EXIST(email));
    }
    return user;
});

const ERROR_USER_NOT_EXIST = (email: string) => `User with email ${email} does not exist`;

export default {
    findByEmail,
};

export const errorMessages = {
    ERROR_USER_NOT_EXIST,
};
