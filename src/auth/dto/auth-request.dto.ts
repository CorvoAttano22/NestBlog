import { IsEnum, IsNotEmpty } from 'class-validator';
import { Operation } from 'src/shared';

export class AuthRequest {
  @IsNotEmpty()
  token: string;

  @IsEnum(Operation, { message: 'Invalid Operation' })
  operation: Operation;
}
