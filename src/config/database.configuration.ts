import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Token } from 'src/auth/token.entity';
import { User } from 'src/user/user.entity';

export const DatabaseModuleOptions: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => {
    const dbHost = configService.get<string>('DB_HOST');
    return {
      type: 'sqlite',
      database: dbHost,
      synchronize: false,
      entities: [User, Token],
    };
  },
  inject: [ConfigService],
};
