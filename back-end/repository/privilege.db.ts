import prismaClient from './prisma/prismaClient';
import { tryCatchWrapper } from '../util/tryCatchWrapper';
import { Privilege } from '../model/privilege';

const findAll = tryCatchWrapper(async (): Promise<Privilege[]> => {
    const privileges = await prismaClient.privilege.findMany({
    });
    return privileges.map(Privilege.from);
});

export default {
    findAll
};
