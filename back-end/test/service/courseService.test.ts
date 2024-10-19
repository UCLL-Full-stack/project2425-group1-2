import { Course } from "../../model/course";
import courseService from "../../service/course.service";
import courseRepository from "../../repository/course.db";
import dummyCourses from "../../data/courses";
let mockDBFindAllCourses: jest.Mock;


beforeEach(() => {});

afterEach(() => {
    jest.clearAllMocks();
});

test("given a list of courses, when getAll is called, then it should return the list of courses", () => {
    mockDBFindAllCourses = jest.fn(() => dummyCourses);
    courseRepository.findAll = mockDBFindAllCourses;

    const result = courseService.getAll();

    expect(result).toEqual(dummyCourses);
    expect(mockDBFindAllCourses).toHaveBeenCalledTimes(1);
});