export default class Course {
    public id?: number;
    public name: string;
    public phase: number;
    public credits: number;

    constructor(course: { id?: number; name: string; phase: number; credits: number}) {
        this.id = course.id;
        this.name = course.name;
        this.phase = course.phase;
        this.credits = course.credits;
    }
}