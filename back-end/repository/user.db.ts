import prismaClient from './prisma/prismaClient';
import { tryCatchWrapper } from '../util/tryCatchWrapper';
import { FullUser, UserView } from '../types/userDTO';

const findByEmail = tryCatchWrapper(async (email: string): Promise<UserView> => {
    const user = await prismaClient.user.findUnique({
        where: { email: email },
    });
    if (!user) {
        throw new Error(ERROR_USER_NOT_EXIST(email));
    }
    return user;
});

const findFullByEmail = tryCatchWrapper(async (email: string): Promise<FullUser> => {
    const user = await prismaClient.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error(ERROR_USER_NOT_EXIST(email));
    }
    const privileges = await prismaClient.privilege.findMany({
        where: {
            administratives: {
                some: {
                    adminId: user.id,
                },
            },
        },
    });
    return {...user, privileges};
});

const ERROR_USER_NOT_EXIST = (email: string) => `User with email ${email} does not exist`;

export default {
    findByEmail,
    findFullByEmail,
};

export const errorMessages = {
    ERROR_USER_NOT_EXIST,
};
