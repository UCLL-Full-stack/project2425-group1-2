export class UserShort {
    public id: number;
    public name: string;

    constructor(user: { id: number, name: string }) {
        this.id = user.id;
        this.name = user.name;
    }
};

export class StudentUpdateView {
    public name: string;
    public email: string;
    public password: string;
    public nationality?: string;
    public passedCourses: number[];

    constructor(student: StudentUpdateView) {
        this.name = student.name;
        this.email = student.email;
        this.password = student.password;
        this.nationality = student.nationality;
        this.passedCourses = student.passedCourses;
    }
}