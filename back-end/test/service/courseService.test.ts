import CourseShortView from "../../types/courseShortView";
import courseService from "../../service/course.service";
import courseRepository from "../../repository/course.db";
import studentService from "../../service/student.service";
import ispService from "../../service/isp.service";
import dummyCourses from "../../data/courses";
import {errorMessages} from "../../service/course.service";
import { CourseUpdateView } from "../../types/courseUpdateView";
import { Course } from "../../model/course";

describe('Course Service', () => {
    let mockDBFindAll: jest.Mock;
    let mockDBFindById: jest.Mock;
    let mockDBFindAllByRequiredCourseId: jest.Mock;
    let mockDBFindByNameAndPhase: jest.Mock;
    let mockDBSave: jest.Mock;
    let mockDBDeleteCourses: jest.Mock;

    let mockStudentServiceGetAllByPassedCourseId: jest.Mock;
    let mockISPServiceGetAllByCourseId: jest.Mock;

    beforeEach(() => {
        mockDBFindAll = jest.fn();
        mockDBFindById = jest.fn();
        mockDBFindAllByRequiredCourseId = jest.fn();
        mockDBFindByNameAndPhase = jest.fn();
        mockDBSave = jest.fn();
        mockDBDeleteCourses = jest.fn();
    
        mockStudentServiceGetAllByPassedCourseId = jest.fn();
        mockISPServiceGetAllByCourseId = jest.fn();
    
        courseRepository.findAll = mockDBFindAll;
        courseRepository.findById = mockDBFindById;
        courseRepository.findByNameAndPhase = mockDBFindByNameAndPhase;
        courseRepository.findAllByRequiredCourseId = mockDBFindAllByRequiredCourseId;
        courseRepository.save = mockDBSave;
        courseRepository.deleteCourses = mockDBDeleteCourses;
        
        studentService.getAllByPassedCourseId = mockStudentServiceGetAllByPassedCourseId;
        ispService.getAllByCourseId = mockISPServiceGetAllByCourseId;
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    describe('get all courses', () => {
        test("given a list of courses, when getAll is called, then it should return the list of courses", () => {
            mockDBFindAll.mockReturnValue(dummyCourses);
    
            const result = courseService.getAll();
    
            expect(result).toEqual(dummyCourses);
            expect(mockDBFindAll).toHaveBeenCalledTimes(1);
        });
    });
    
    describe('get all courses in short view', () => {
        test("given a list of courses, when getAllShort is called, then it should return the list of courses in short view", () => {
            mockDBFindAll.mockReturnValue(dummyCourses);
    
            const result = courseService.getAllShort();
    
            expect(result).toEqual(dummyCourses.map(course => new CourseShortView(course)));
            expect(mockDBFindAll).toHaveBeenCalledTimes(1);
        });
    });
    
    describe('get course by id', () => {
        test("given a list of courses, when getCourseById is called, then it should return the course with this id", () => {
            mockDBFindById.mockReturnValue(dummyCourses[1]);
    
            const result = courseService.getCourseById(1);
    
            expect(result).toEqual(dummyCourses[1]);
            expect(mockDBFindById).toHaveBeenCalledTimes(1);
        });
    
        test("given a list of courses and wrong ID, when getCourseById is called, then it should throw an exception", () => {
            mockDBFindById.mockReturnValue(null);
    
            expect(() => courseService.getCourseById(1)).toThrow(errorMessages.ERROR_COURSE_NOT_EXIST);
            expect(mockDBFindById).toHaveBeenCalledTimes(1);
        });
    });
    
    describe('create course', () => {
        beforeEach(() => {
            mockDBFindById.mockImplementation((id) => dummyCourses[id-1]);
            mockDBFindByNameAndPhase.mockImplementation((name, phase) => null);
            mockDBSave.mockImplementation((course) => {
                if (course.id == undefined) {
                    course = new Course({
                        id: dummyCourses.length + 1,
                        name: course.name,
                        description: course.description,
                        phase: course.phase,
                        credits: course.credits,
                        lecturers: course.lecturers,
                        isElective: course.isElective,
                        requiredPassedCourses: course.requiredPassedCourses,
                    });
                }
                return course;
            });
        });  
        test('given a course, when createCourse is called, then it should create the course', () => {
            let expectedCourse = new Course(dummyCourses[0]);
            expectedCourse = new Course({
                id: dummyCourses.length + 1,
                name: expectedCourse.name,
                description: expectedCourse.description,
                phase: expectedCourse.phase,
                credits: expectedCourse.credits,
                lecturers: expectedCourse.lecturers,
                isElective: expectedCourse.isElective,
                requiredPassedCourses: [],
            });
            const inputInfo = new CourseUpdateView({
                name: expectedCourse.name,
                description: expectedCourse.description,
                phase: expectedCourse.phase,
                credits: expectedCourse.credits,
                lecturers: expectedCourse.lecturers,
                isElective: expectedCourse.isElective,
                requiredPassedCourses: [],
            });
    
            const result = courseService.createCourse(inputInfo);
    
            expect(result).toEqual(expectedCourse);
            expect(mockDBFindById).toHaveBeenCalledTimes(0);
            expect(mockDBFindByNameAndPhase).toHaveBeenCalledTimes(1);
            expect(mockDBSave).toHaveBeenCalledTimes(1);
        });

        test('given a course that already exists with given phase and name, when createCourse is called, then it should throw an exception', () => {
            const expectedCourse = dummyCourses[0];
            const inputInfo = new CourseUpdateView({
                name: expectedCourse.name,
                description: expectedCourse.description,
                phase: expectedCourse.phase,
                credits: expectedCourse.credits,
                lecturers: expectedCourse.lecturers,
                isElective: expectedCourse.isElective,
                requiredPassedCourses: [],
            });
    
            mockDBFindByNameAndPhase.mockImplementation((name, phase) => expectedCourse);
    
            expect(() => courseService.createCourse(inputInfo)).toThrow(errorMessages.ERROR_COURSE_EXIST(expectedCourse.name, expectedCourse.phase));
            expect(mockDBFindById).toHaveBeenCalledTimes(0);
            expect(mockDBFindByNameAndPhase).toHaveBeenCalledTimes(1);
            expect(mockDBSave).toHaveBeenCalledTimes(0);
        });
    });

    describe('update course', () => {
        beforeEach(() => {
            mockDBFindById.mockImplementation((id) => dummyCourses[id-1]);
            mockISPServiceGetAllByCourseId.mockImplementation((id) => []);
            mockDBSave.mockImplementation((course) => course);
        });  
        test('given a course, when updateCourse is called, then it should update the course', () => {
            const expectedCourse = dummyCourses[0];
            const inputInfo = new CourseUpdateView({
                name: expectedCourse.name,
                description: expectedCourse.description,
                phase: expectedCourse.phase,
                credits: expectedCourse.credits,
                lecturers: expectedCourse.lecturers,
                isElective: expectedCourse.isElective,
                requiredPassedCourses: [],
            });
    
            const result = courseService.updateCourse(1, inputInfo);
    
            expect(result).toEqual(expectedCourse);
            expect(mockDBFindById).toHaveBeenCalledTimes(1);
            expect(mockISPServiceGetAllByCourseId).toHaveBeenCalledTimes(0);
            expect(mockDBSave).toHaveBeenCalledTimes(1);
        });
        test('given a course that is chosen in ISP, when updateCourse is called with new phase or credits, then it should throw an exception', () => {
            const expectedCourse = dummyCourses[0];
            const inputInfo = new CourseUpdateView({
                name: expectedCourse.name,
                description: expectedCourse.description,
                phase: expectedCourse.phase+1,
                credits: expectedCourse.credits+1,
                lecturers: expectedCourse.lecturers,
                isElective: expectedCourse.isElective,
                requiredPassedCourses: [],
            });
    
            mockISPServiceGetAllByCourseId.mockImplementation((id) => [{ id, name: `ISP ${id}` }]);
    
            expect(() => courseService.updateCourse(1, inputInfo)).toThrow(errorMessages.ERROR_COURSE_PHASE_CREDITS_CHANGE);
            expect(mockDBFindById).toHaveBeenCalledTimes(1);
            expect(mockISPServiceGetAllByCourseId).toHaveBeenCalledTimes(1);
            expect(mockDBSave).toHaveBeenCalledTimes(0);
        });
        test('given the updated course that requires itself, when updateCourse is called, then it should throw an exception', () => {
            const expectedCourse = dummyCourses[0];
            const inputInfo = new CourseUpdateView({
                name: expectedCourse.name,
                description: expectedCourse.description,
                phase: expectedCourse.phase,
                credits: expectedCourse.credits,
                lecturers: expectedCourse.lecturers,
                isElective: expectedCourse.isElective,
                requiredPassedCourses: [1],
            });
    
            expect(() => courseService.updateCourse(1, inputInfo)).toThrow(errorMessages.ERROR_COURSE_REQUIRE_ITSELF);
            expect(mockDBFindById).toHaveBeenCalledTimes(1);
            expect(mockISPServiceGetAllByCourseId).toHaveBeenCalledTimes(0);
            expect(mockDBSave).toHaveBeenCalledTimes(0);
        });
    });

    describe('delete courses', () => {
    
        beforeEach(() => {
            mockDBFindById.mockImplementation((id) => dummyCourses[0]);
            mockDBFindAllByRequiredCourseId.mockImplementation((id) => []);
            mockISPServiceGetAllByCourseId.mockImplementation((id) => []);
            mockStudentServiceGetAllByPassedCourseId.mockImplementation((id) => []);
        });    
    
        test('given a list of course IDs, when deleteCourses is called, then it should delete the courses', () => {
            mockDBFindById.mockImplementation((id) => ({ id, name: `Course ${id}` }));
            mockDBFindAllByRequiredCourseId.mockImplementation((id) => "");
            mockISPServiceGetAllByCourseId.mockImplementation((id) => "");
            mockStudentServiceGetAllByPassedCourseId.mockImplementation((id) => "");
    
            const ids = [1, 2, 3];
            const result = courseService.deleteCourses(ids);
    
            expect(result).toBe("Courses are successfully deleted");
            expect(mockDBFindById).toHaveBeenCalledTimes(ids.length);
            expect(mockDBDeleteCourses).toHaveBeenCalledWith(ids);
        });
    
        test('given a list of course IDs with one non-existent ID, when deleteCourses is called, then it should throw an exception', () => {
            mockDBFindById.mockImplementation((id) => id === 2 ? null : { id, name: `Course ${id}` });
            
            const ids = [1, 2, 3];
    
            expect(() => courseService.deleteCourses(ids)).toThrow(errorMessages.ERROR_COURSE_NOT_EXIST);
            expect(mockDBFindById).toHaveBeenCalledTimes(2);
            expect(mockDBFindAllByRequiredCourseId).toHaveBeenCalledTimes(1);
            expect(mockISPServiceGetAllByCourseId).toHaveBeenCalledTimes(1);
            expect(mockStudentServiceGetAllByPassedCourseId).toHaveBeenCalledTimes(1);
        });
    
        test('given a list of course IDs with one required by ISP, when deleteCourses is called, then it should throw an exception', () => {
            mockISPServiceGetAllByCourseId.mockImplementation((id) => id === 2 ? [{ id: 1, name: `ISP ${id}` }] : []);
    
            const ids = [1, 2, 3];
    
            expect(() => courseService.deleteCourses(ids)).toThrow(errorMessages.ERROR_COURSE_CHOSEN_IN_ISP);
            expect(mockDBFindById).toHaveBeenCalledTimes(2);
            expect(mockDBFindAllByRequiredCourseId).toHaveBeenCalledTimes(1);
            expect(mockISPServiceGetAllByCourseId).toHaveBeenCalledTimes(2);
            expect(mockStudentServiceGetAllByPassedCourseId).toHaveBeenCalledTimes(1);
        });
    
        test('given a list of course IDs with one passed by student, when deleteCourses is called, then it should throw an exception', () => {
            mockStudentServiceGetAllByPassedCourseId.mockImplementation((id) => id !== 2 ? [] : [{ id: 1, name: `Student ${id}` }]);
    
            const ids = [1, 2, 3];
    
            expect(() => courseService.deleteCourses(ids)).toThrow(errorMessages.ERROR_COURSE_PASSED_BY_STUDENT);
            expect(mockDBFindById).toHaveBeenCalledTimes(2);
            expect(mockDBFindAllByRequiredCourseId).toHaveBeenCalledTimes(1);
            expect(mockISPServiceGetAllByCourseId).toHaveBeenCalledTimes(2);
            expect(mockStudentServiceGetAllByPassedCourseId).toHaveBeenCalledTimes(2);
        });
    
        test('given a list of course IDs with one required by another course, when deleteCourses is called, then it should throw an exception', () => {
            mockDBFindAllByRequiredCourseId.mockImplementation((id) => id !== 2 ? [] : [{ id, name: `Course ${id}` }]);
    
            const ids = [1, 2, 3];
    
            expect(() => courseService.deleteCourses(ids)).toThrow(errorMessages.ERROR_COURSE_REQUIRED_BY_COURSE);
            expect(mockDBFindById).toHaveBeenCalledTimes(2);
            expect(mockDBFindAllByRequiredCourseId).toHaveBeenCalledTimes(2);
            expect(mockISPServiceGetAllByCourseId).toHaveBeenCalledTimes(2);
            expect(mockStudentServiceGetAllByPassedCourseId).toHaveBeenCalledTimes(2);
        });
    });
});