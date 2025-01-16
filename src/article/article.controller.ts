import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleRequest } from './dto/article-request.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createArticle(
    @Body() body: ArticleRequest,
    @CurrentUser() user: User,
  ): Promise<{ id: number }> {
    return this.articleService.saveArticle(body, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateArticle(
    @Body() body: ArticleRequest,
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<{ id: number }> {
    return this.articleService.updateArticle(id, body, user);
  }

  @Patch('/:id/publish')
  @UseGuards(AuthGuard)
  async publishArticle(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<{ published: boolean }> {
    return this.articleService.publishArticle(id, user);
  }
}
