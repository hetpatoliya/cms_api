import { ArticleService } from "../services/article.service";
import { Request, Response } from "express";
import { extendedRequest } from "../interfaces/Other";
import { IArticle } from "../interfaces/Article";

const articleService = new ArticleService();

export class ArticleController {

    public async getAllArticles(req: Request, res: Response) {
        try {
            const data = await articleService.getAllArticle();
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async getArticleById(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const data = await articleService.getArticleById(userId);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async uploadArticle(req: extendedRequest, res: Response) {
        try {
            const article: IArticle = req.body;
            const userId = req.userId;
            const data = await articleService.uploadArticale(article, userId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async editArticle(req: extendedRequest, res: Response) {
        try {
            const article: IArticle = req.body;
            const articleId = req.params.articleId;
            const data = await articleService.editArticle(article, articleId);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }

    public async deleteArticle(req: extendedRequest, res: Response) {
        try {
            const articleId = req.params.articleId;
            const data = await articleService.deleteArticle(articleId);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            })
        }
    }
}