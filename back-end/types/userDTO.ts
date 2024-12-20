import { Privilege, UserTypes } from "@prisma/client";

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

export type FullUser = {
    id: number;
    name: string;
    email: string;
    password: string;
    userType: UserTypes;
    privileges: Privilege[];
}

export class AuthenticationRequest {
    public username: string;
    public password: string;

    constructor(authenticationRequest: { username: string, password: string }) {
        this.username = authenticationRequest.username;
        this.password = authenticationRequest.password;
    }
}

export type SessionData = {
    userId: number;
    email: string;
    role: string;
    privileges?: number[];
}

export type AuthenticationResponse = {
    token: string;
    data: SessionData;
};