import { ArticleController } from "../controllers/article.controller";
import express from 'express';
import { authanticateEditor } from "../middleware/authUser";

const articleController = new ArticleController();
const router = express.Router();

router.get('/', articleController.getAllArticles);
router.get('/:userId', articleController.getArticleById);
router.post('/', authanticateEditor, articleController.uploadArticle);
router.put('/:articleId', authanticateEditor, articleController.editArticle);
router.delete('/:articleId', authanticateEditor, articleController.deleteArticle);

export default router;