import { User } from './../user/user.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArticleRequest } from './dto/article-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { generateUniqueValue } from 'src/shared';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  async saveArticle(
    value: ArticleRequest,
    user: User,
  ): Promise<{ id: number }> {
    const article = new Article();
    article.title = value.title;
    article.content = value.content;
    article.image = value.image;
    article.slug = encodeURIComponent(
      value.title.toLowerCase().replaceAll(' ', '-') +
        '-' +
        generateUniqueValue(true),
    );

    article.user = user;
    await this.articleRepository.save(article);
    return { id: article.id };
  }

  async updateArticle(
    id: number,
    value: ArticleRequest,
    user: User,
  ): Promise<{ id: number }> {
    const articleInDb = await this.getArticle(id, user);
    (articleInDb.title = value.title),
      (articleInDb.content = value.content),
      (articleInDb.image = value.image);
    await this.articleRepository.save(articleInDb);
    return { id };
  }

  async publishArticle(
    id: number,
    user: User,
  ): Promise<{ published: boolean }> {
    const articleInDb = await this.getArticle(id, user);
    articleInDb.published = !articleInDb.published;
    articleInDb.published_at = articleInDb.published ? new Date() : null;
    await this.articleRepository.save(articleInDb);
    return { published: articleInDb.published };
  }

  private async getArticle(id: number, user: User): Promise<Article> {
    const articleInDb = await this.articleRepository.findOne({
      where: { id },
      loadRelationIds: { disableMixedMap: true },
    });

    if (!articleInDb) {
      throw new NotFoundException();
    }

    if (articleInDb.user.id !== user.id) {
      throw new ForbiddenException();
    }
    return articleInDb;
  }
}
