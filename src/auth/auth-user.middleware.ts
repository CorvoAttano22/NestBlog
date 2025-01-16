import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.cookies['app-token'];
    if (!authToken) {
      return next();
    }
    const user = await this.authService.getUserFromToken(authToken);
    req['user'] = user;
    next();
  }
}
