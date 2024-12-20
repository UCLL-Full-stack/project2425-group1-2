import express, { NextFunction, Request, Response } from 'express';import studentService from "../service/student.service";

const studentRouter = express.Router();

studentRouter.get("/" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
});

studentRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);

        const student = await studentService.getStudentById(id);

        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        next(error);
    }
});

// studentRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const newStudent = req.body;
//         const student = await studentService.addStudent(newStudent);
//         res.status(201).json(student);
//     } catch (error) {
//         console.error("Route error:", error);
        
//     }
// });

studentRouter.get("/shortform" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await studentService.getAllStudentsShortForm();
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
});

studentRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);

        const isDeleted = await studentService.deleteStudentById(id);

        if (isDeleted) {
            res.status(200).json({ message: "Student deleted successfully" });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        next(error);
    }
});


export {
    studentRouter
};