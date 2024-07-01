import { MediaService } from "../services/media.service";
import { Request, Response } from "express";
import { extendedRequest } from "../interfaces/Other";
import { IMedia } from "../interfaces/Media";

const mediaService = new MediaService();

export class MediaController {

    public async getAllMedia(req: Request, res: Response) {
        try {
            const data = await mediaService.getAllMedia();
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async getMediaById(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const data = await mediaService.getMediaById(userId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async uploadMedia(req: extendedRequest, res: Response) {
        try {
            const media: IMedia = req.body;
            const userId = req.userId;
            const url = req.file!.path;
            const data = await mediaService.uploadMedia(media, userId!, url);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async editMedia(req: extendedRequest, res: Response) {
        try {
            const media: IMedia = req.body;
            const mediaId = req.params.mediaId;
            const url = req.file!.path;
            const data = await mediaService.editMedia(media, mediaId, url);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async deleteMedia(req: extendedRequest, res: Response) {
        try {
            const mediaId = req.params.mediaId;
            const data = await mediaService.deleteMedia(mediaId);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

}