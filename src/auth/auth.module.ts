import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Token])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
