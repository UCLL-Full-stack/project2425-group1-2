/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       Course:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *             description: Course name.
 *           description:
 *             type: string
 *             description: Course description.
 *           phase:
 *             type: number
 *             description: Course phase.
 *           credits:
 *             type: number
 *             description: Course credits.
 *           lecturers: 
 *             type: array
 *             items:
 *               type: string
 *           isElective:
 *             type: boolean
 *       CourseShortView:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *             description: Course name.
 *           phase:
 *             type: number
 *             description: Course phase.
 *           credits:
 *             type: number
 *             description: Course credits.
 */

import express, { NextFunction, Request, Response } from 'express';
import courseService from '../service/course.service';

const courseRouter = express.Router();

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: All courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
courseRouter.get("/" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(courseService.getAll());
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /course:
 *   get:
 *     summary: Get all courses in short form
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: All courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseShortView'
 */
courseRouter.get("/short" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(courseService.getAllShort());
    } catch (error) {
        next(error);
    }
});

export {
    courseRouter
};