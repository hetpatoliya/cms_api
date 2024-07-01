import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { extendedRequest } from '../interfaces/Other';

const authanticateUser = (req: extendedRequest, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized : Missing token!' });
    }

    jwt.verify(token.split(' ')[1], '1gdbuyf%^%^#FDTAFFFFFF3sufgbuyf', (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Unauthorized : Invalid Token!' });
        }

        req.userId = (decoded as { userId: string }).userId;
        req.role = (decoded as { role: string }).role;

        next();
    });
}

const authanticateAdmin = (req: extendedRequest, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized : Missing token!' });
    }

    jwt.verify(token.split(' ')[1], '1gdbuyf%^%^#FDTAFFFFFF3sufgbuyf', (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Unauthorized : Invalid Token!' });
        }

        if ((decoded as { role: string }).role != 'admin') {
            return res.status(400).json({ message: 'Only admin has access to this service!' });
        }

        req.userId = (decoded as { userId: string }).userId;
        req.role = (decoded as { role: string }).role;

        next();
    });
}

const authanticateEditor = (req: extendedRequest, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized : Missing token!' });
    }

    jwt.verify(token.split(' ')[1], '1gdbuyf%^%^#FDTAFFFFFF3sufgbuyf', (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Unauthorized : Invalid Token!' });
        }

        if ((decoded as { role: string }).role != 'editor') {
            return res.status(400).json({ message: 'Only editors have access to this service!' });
        }

        req.userId = (decoded as { userId: string }).userId;
        req.role = (decoded as { role: string }).role;

        next();
    });
}

export { authanticateUser, authanticateAdmin, authanticateEditor };