// administrative.ts
import { User } from "./user";
import { Privilege } from "./privilege";
import { Privilege as PrismaPrivilege} from "@prisma/client";
import { PrismaAdministrative } from "../types/prismaTypesExtension";


export class Administrative extends User {
    private readonly _privileges: Privilege[];

    constructor(administrative: { id: number; name: string; email: string; password: string; privileges: Privilege[] }) {
        super({
            id: administrative.id,
            name: administrative.name,
            email: administrative.email,
            password: administrative.password,
        });
        this.validates(administrative);
        this._privileges = administrative.privileges;
    }
    validates(administrative: { privileges: Privilege[]}) {
        if (!administrative.privileges || administrative.privileges.length === 0) {
            throw new Error("Privileges are required for administrative users.");
        }
    }

    public get privileges(): Privilege[] {
        return this._privileges;
    }


    public static from({
        id,
        name,
        email,
        password,
        privileges,
    }: PrismaAdministrative & {privileges: PrismaPrivilege[]}): Administrative {
        return new Administrative({
            id,
            name,
            email,
            password,
            privileges: privileges.map(Privilege.from),
        });
    }
}
