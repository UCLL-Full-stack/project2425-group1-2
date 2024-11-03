const request = require('supertest');
const app = require('../../app');
import courses from '../../data/courses';
import CourseShortView from '../../types/courseShortView';
import courseRepository from '../../repository/course.db';
import { errorMessages } from '../../service/course.service';
import { Course } from '../../model/course';

let DBcourses: Course[] = courses;

describe('Course router', () => {
    beforeEach(() => {
        courseRepository.initDb();
    });

    describe('get all courses', () => {
        it('should return 200 and the courses', async () => {
            const response = await request(app)
                .get('/courses')
                .set('content-type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(1);
            expect(response.body).toEqual(DBcourses);
        });
    });

    describe('get all courses short', () => {
        it('should return 200 and the courses in short form', async () => {
            const response = await request(app)
                .get('/courses/short')
                .set('content-type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(1);
            expect(response.body).toEqual(DBcourses.map((course) => new CourseShortView(course)));
        });
    });

    describe('get a course by id', () => {
        it('should return 200 and the course with the given id', async () => {
            let id: number = 1;
            const response = await request(app)
                .get('/courses/' + id)
                .set('content-type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(DBcourses.find((course) => course.id === id));
        });

        it('should return 400 and throw an error: course with id does not exist', async () => {
            let id: number = 112123;
            const response = await request(app)
                .get('/courses/' + id)
                .set('content-type', 'application/json');

            expect(response.status).toBe(400);
            expect(response.text).toContain(errorMessages.ERROR_COURSE_NOT_EXIST);
        });
    });

    describe('delete courses by ids', () => {
        it('should return 200 and a success message', async () => {
            const ids = courses.slice(3, 5).map((course) => course.id);
            const response = await request(app)
                .delete('/courses/delete')
                .send(ids)
                .set('content-type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.text).toEqual('Courses are successfully deleted');
        });

        it('should throw an error: one of the course ids does not exist', async () => {
            const ids = [999999];
            const response = await request(app)
                .delete('/courses/delete')
                .send(ids)
                .set('content-type', 'application/json');

            expect(response.status).toBe(400);
            expect(response.text).toContain(errorMessages.ERROR_COURSE_NOT_EXIST);
        });
    });

    describe('update a course', () => {
        it('should return 200 and the updated course', async () => {
            let id: number = 1;
            const courseUpdateInfo = {
                name: 'Updated course name',
                description: 'Updated course description',
                phase: 2,
                credits: 5,
                lecturers: ['Updated lecturer'],
                isElective: false,
                requiredPassedCourses: [],
            };
            const response = await request(app)
                .put('/courses/' + id)
                .send(courseUpdateInfo)
                .set('content-type', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                new Course({
                    id: id,
                    name: courseUpdateInfo.name,
                    description: courseUpdateInfo.description,
                    phase: courseUpdateInfo.phase,
                    credits: courseUpdateInfo.credits,
                    lecturers: courseUpdateInfo.lecturers,
                    isElective: courseUpdateInfo.isElective,
                    requiredPassedCourses: courseUpdateInfo.requiredPassedCourses,
                })
            );
        });
    });
});
