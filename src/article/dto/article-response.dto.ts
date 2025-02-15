import { User } from 'src/user/user.entity';
import { Article } from '../article.entity';

export class Author {
  id: number;
  handle: string;
  name: string;
  image: string;
  constructor(user: User) {
    this.id = user.id;
    this.handle = user.handle;
    this.name = user.name;
    this.image = user.image;
  }
}

export class ShortArticle {
  id: number;
  title: string;
  slug: string;
  image: string;
  published: boolean;
  publishedAt: Date;
  author: Author;
  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.slug = article.slug;
    this.image = article.image;
    this.published = article.published;
    this.publishedAt = article.published_at;
    this.author = new Author(article.user);
  }
}

export class ArticleWithContent extends ShortArticle {
  content: string;
  constructor(article: Article) {
    super(article);
    this.content = article.content;
  }
}
