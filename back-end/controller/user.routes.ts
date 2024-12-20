/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *             description: User's full name.
 *           email:
 *             type: string
 *             description: User's email address.
 *           password:
 *             type: string
 *             description: User's password.
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Get a user by email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await userService.getUserByEmail(req.params.id));
    } catch (error) {
        next(error);
    }
});

export { userRouter };
