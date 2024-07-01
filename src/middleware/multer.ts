import multer from 'multer';
import path from 'path';
import { NextFunction, Request, Response } from 'express';

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req: Request, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1024 },
    // fileFilter: (req, file, cb) => {

    //     const filetypes = /jpeg|jpg|png|mp3|mp4/;
    //     const mimetype = filetypes.test(file.mimetype);
    //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //     if (mimetype && extname) {
    //         return cb(null, true);
    //     } else {
    //         cb(new Error('Only images are allowed!'));
    //     }
    // }
});

export default upload;