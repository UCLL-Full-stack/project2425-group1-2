// administrative.ts
import { User } from "./user";
import { Privilege } from "./privilege";

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


}
