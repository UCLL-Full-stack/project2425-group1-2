export class UserShort {
    public id: number;
    public name: string;

    constructor(user: { id: number, name: string }) {
        this.id = user.id;
        this.name = user.name;
    }
};

export class UserView {
    public id: number;
    public name: string;
    public email: string;
    public password: string;

    constructor(user: { id: number, name: string, email: string, password: string }) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }
}