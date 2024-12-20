import express, { NextFunction, Request, Response } from 'express';
import administrativeService from '../service/administrative.service';


const administrativeRouter = express.Router();

administrativeRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await administrativeService.getAllAdmins()
        res.status(200).json(admins);
    } catch (error) {
        next(error);
    }
});

administrativeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const admin = await administrativeService.getAdminById(id);

        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: "Admin not found" });
        }
    } catch (error) {
        next(error);
    }
});

administrativeRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);

        const isDeleted = await administrativeService.deleteAdminById(id);

        if (isDeleted) {
            res.status(200).json({ message: "Admin deleted successfully" });
        } else {
            res.status(404).json({ message: "Admin not found" });
        }
    } catch (error) {
        next(error);
    }
});

export {
    administrativeRouter
}