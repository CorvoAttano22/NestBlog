import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EmailModule } from 'src/email/email.module';
import { UniqueEmail } from './validator/unique-email.validator';

@Module({
  providers: [UserService, UniqueEmail],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  exports: [UserService],
})
export class UserModule {}
