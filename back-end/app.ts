import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { courseRouter } from './controller/course.routes';
import { studentRouter } from './controller/student.routes';
import { ispRouter } from './controller/isp.routes';
import { privilegeRouter } from './controller/privilege.routes';
import { userRouter } from './controller/user.routes';
import { administrativeRouter } from './controller/administrative.routes';


const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

//Mappings
app.use("/courses", courseRouter);
app.use("/students", studentRouter);
app.use("/isps", ispRouter);
app.use("/privileges", privilegeRouter);
app.use("/users", userRouter);
app.use("/admins", administrativeRouter);

//Swagger
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(400).json({ status: "application error", message: err.message });
});

module.exports = app;
