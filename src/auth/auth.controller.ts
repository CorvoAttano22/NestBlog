import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './dto/auth-request.dto';
import { AuthUser } from './dto/auth-user.dto';
import { Response, Request } from 'express';
import { LoginUser } from './dto/login-user-dto';
import { GenericResponse } from 'src/shared';

const ONE_YEAR_IN_MILIS = 365 * 24 * 60 * 1000;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleAuth(
    @Body() body: AuthRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthUser> {
    const result = await this.authService.handleAuth(body);
    response.cookie('app-token', result.token, {
      expires: new Date(Date.now() + ONE_YEAR_IN_MILIS),
      httpOnly: true,
    });
    return result.user;
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.deleteToken(request.cookies['app-token']);
    response.clearCookie('app-token');
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async handleLogin(@Body() body: LoginUser): Promise<GenericResponse> {
    await this.authService.handleLogin(body);
    return new GenericResponse('Please check your email');
  }
}
