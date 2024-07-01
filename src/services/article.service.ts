import { IArticle } from "../interfaces/Article";
import { Article } from "../models/Article";

export class ArticleService {

    public async getAllArticle() {
        const articles = await Article.find();
        return { statusCode: 200, articles };
    }

    public async uploadArticale(article: IArticle, userId: string) {
        const newArticle = await Article.create({ ...article, uploadedBy: userId });
        return { statusCode: 200, message: 'Article uploaded successfully!', newArticle }
    }

    public async getArticleById(userId: string) {
        const articles = await Article.find({ uploadedBy: userId });
        return { statusCode: 200, articles };
    }

    public async editArticle(article: IArticle, articleId: string) {
        const isArticle = await Article.findById(articleId);

        if (!isArticle) {
            return { statusCode: 400, message: 'No such article found!' };
        }

        const updatedArticle = await Article.findByIdAndUpdate(articleId, article, { new: true });
        return { statusCode: 200, message: 'Article updated successfully!', updatedArticle };
    }

    public async deleteArticle(articleId: string) {
        const isArticle = await Article.findById(articleId);

        if (!isArticle) {
            return { statusCode: 400, message: 'No such article found!' };
        }

        const deletedArticle = await Article.findByIdAndDelete(articleId);
        return { statusCode: 200, message: 'Article deleted successfully!', deletedArticle };
    }
}