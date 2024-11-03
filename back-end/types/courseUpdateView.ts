export class CourseUpdateView {
    name: string;
    description: string;
    phase: number;
    credits: number;
    lecturers: string[];
    isElective: boolean;
    requiredPassedCourses: number[];

    constructor(course: {
        name: string;
        description: string;
        phase: number;
        credits: number;
        lecturers: string[];
        isElective: boolean;
        requiredPassedCourses: number[];
    }) {
        this.name = course.name;
        this.description = course.description;
        this.phase = course.phase;
        this.credits = course.credits;
        this.lecturers = course.lecturers;
        this.isElective = course.isElective;
        this.requiredPassedCourses = course.requiredPassedCourses;
    }
}
