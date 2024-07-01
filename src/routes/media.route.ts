import { MediaController } from "../controllers/media.controller";
import express from 'express';
import { authanticateEditor } from "../middleware/authUser";
import upload from '../middleware/multer';

const router = express.Router();
const mediaController = new MediaController();

router.get('/', mediaController.getAllMedia);
router.get('/:userId', mediaController.getMediaById);
router.post('/', authanticateEditor, upload.single('file'), mediaController.uploadMedia);
router.put('/:mediaId', authanticateEditor, upload.single('file'), mediaController.editMedia);
router.delete('/:mediaId', authanticateEditor, mediaController.deleteMedia);

export default router;