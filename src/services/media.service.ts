import { Media } from "../models/Media";
import { IMedia } from "../interfaces/Media";
import fs from 'fs';

export class MediaService {

    public async getAllMedia() {
        const media = await Media.find();
        return { statusCode: 200, media };
    }

    public async getMediaById(userId: string) {
        const media = await Media.find({ uploadedBy: userId });
        return { statusCode: 200, media };
    }

    public async uploadMedia(media: IMedia, userId: string, url: string) {
        const newMedia = await Media.create({ ...media, uploadedBy: userId, url });
        return { statusCode: 200, message: 'Media created successfully!', newMedia };
    }

    public async editMedia(media: IMedia, mediaId: string, url: string) {
        const ismedia = await Media.findById(mediaId);
        if (!ismedia) {
            return { statusCode: 400, message: 'Media is not found!' }
        }

        fs.unlink(`C:/CMS/cms_api/${ismedia.url}`, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return { statusCode: 500, message: 'Failed to delete media!' };
            }
        })

        const updatedmedia = await Media.findByIdAndUpdate(mediaId, { ...media, url }, { new: true });
        return { statusCode: 200, message: 'Media updated successfully!', updatedmedia };
    }

    public async deleteMedia(mediaId: string) {

        const media = await Media.findOne({ _id: mediaId });
        if (!media) {
            return { statusCode: 400, message: 'Media not found!' };
        }

        fs.unlink(`C:/CMS/cms_api/${media.url}`, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return { statusCode: 500, message: 'Failed to delete media!' };
            }
            console.log('File deleted successfully');
        });

        const deletedmedia = await Media.findByIdAndDelete(mediaId);
        return { statusCode: 200, message: 'Media Deleted successfully!', deletedmedia };
    }
}