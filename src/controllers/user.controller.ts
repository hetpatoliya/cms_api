import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { IUser } from "../interfaces/User";

const userService = new UserService();

export class UserController {

    public async getAllUsers(req: Request, res: Response) {
        try {
            const data = await userService.getAllUsers();
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async createUser(req: Request, res: Response) {
        try {
            const user: IUser = req.body;
            const data = await userService.createUser(user);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async loginUser(req: Request, res: Response) {
        try {
            const user: IUser = req.body;
            const data = await userService.loginUser(user);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            const user: IUser = req.body;
            const userId = req.params.userId;
            const data = await userService.updateUser(userId, user);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const data = await userService.deleteUser(userId);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }
}