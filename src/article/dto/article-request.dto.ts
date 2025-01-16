import { MaxLength, MinLength } from 'class-validator';

export class ArticleRequest {
  @MinLength(3)
  @MaxLength(128)
  title: string;

  @MinLength(10)
  @MaxLength(65536)
  content: string;

  image: string;
}
