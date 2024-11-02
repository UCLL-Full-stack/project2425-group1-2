import { ISP } from "../../model/isp";
import { Student } from "../../model/student";
import { Course } from "../../model/course";

const mockCourse = new Course({
    id: 1,
    name: "Full-stack Development",
    description: "Learn full-stack development",
    phase: 2,
    credits: 6,
    lecturers: ["Dr. Smith"],
    isElective: true,
    requiredPassedCourses: []
});

const mockStudent = new Student({
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password123",
    nationality: "Belgian",
    startYear: 2022,
    passedCourses: []
});

test('given: valid values for ISP, when: ISP is created, then: ISP is created with those values', () => {
    const isp = new ISP({
        id: 1,
        status: "active",
        totalCredits: 18,
        year: 2022,
        courses: [mockCourse],
        student: mockStudent
    });

    expect(isp.id).toEqual(1);
    expect(isp.status).toEqual("active");
    expect(isp.totalCredits).toEqual(18);
    expect(isp.year).toEqual(2022);
    expect(isp.courses).toContain(mockCourse);
    expect(isp.student).toEqual(mockStudent);
});

test("given: missing status, when: ISP is created, then: an error is thrown", () => {
    const createISP = () => new ISP({
        id: 1,
        status: "",
        totalCredits: 18,
        year: 2022,
        courses: [mockCourse],
        student: mockStudent
    });

    expect(createISP).toThrow("Description is required.");
});

test("given: negative totalCredits, when: ISP is created, then: an error is thrown", () => {
    const createISP = () => new ISP({
        id: 1,
        status: "active",
        totalCredits: -10,
        year: 2022,
        courses: [mockCourse],
        student: mockStudent
    });

    expect(createISP).toThrow("Credits are required and cannot be negative");
});

test("given: invalid year format, when: ISP is created, then: an error is thrown", () => {
    const createISP = () => new ISP({
        id: 1,
        status: "active",
        totalCredits: 18,
        year: 999,
        courses: [mockCourse],
        student: mockStudent
    });

    expect(createISP).toThrow("Start year should be 4 digit.");
});

test("given: no student, when: ISP is created, then: an error is thrown", () => {
    const createISP = () => new ISP({
        id: 1,
        status: "active",
        totalCredits: 18,
        year: 2022,
        courses: [mockCourse],
        student: undefined as any
    });

    expect(createISP).toThrow("Student is required.");
});

test("given: two ISPs with same properties, when: equals is called, then: returns true", () => {
    const isp1 = new ISP({
        id: 1,
        status: "active",
        totalCredits: 18,
        year: 2022,
        courses: [mockCourse],
        student: mockStudent
    });

    const isp2 = new ISP({
        id: 1,
        status: "active",
        totalCredits: 18,
        year: 2022,
        courses: [mockCourse],
        student: mockStudent
    });

    expect(isp1.equals(isp2)).toBe(true);
});

test("given: two ISPs with different properties, when: equals is called, then: returns false", () => {
    const isp1 = new ISP({
        id: 1,
        status: "active",
        totalCredits: 18,
        year: 2022,
        courses: [mockCourse],
        student: mockStudent
    });

    const isp2 = new ISP({
        id: 2,
        status: "inactive",
        totalCredits: 24,
        year: 2023,
        courses: [],
        student: mockStudent
    });

    expect(isp1.equals(isp2)).toBe(false);
});
