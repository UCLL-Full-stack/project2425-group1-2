export class UserShort {
    public id: number;
    public name: string;

    constructor(user: { id: number, name: string }) {
        this.id = user.id;
        this.name = user.name;
    }
};