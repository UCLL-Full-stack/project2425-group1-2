export class StudentIncludeCourses {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public nationality: string;
    public studyYear: number;
    public courses: { courseId: number }[];

    constructor(student: {
        id: number;
        name: string;
        email: string;
        password: string;
        nationality: string;
        studyYear: number;
        courses: { courseId: number }[];
    }) {
        this.id = student.id;
        this.name = student.name;
        this.email = student.email;
        this.password = student.password;
        this.nationality = student.nationality;
        this.studyYear = student.studyYear;
        this.courses = student.courses;
    }
}