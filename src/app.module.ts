import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModuleOptions } from './config/database.configuration';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(DatabaseModuleOptions),
    UserModule,
    EmailModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.dev.env' : '.env',
      isGlobal: true,
    }),
    AuthModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
