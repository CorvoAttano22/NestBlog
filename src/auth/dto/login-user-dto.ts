import { IsEmail } from 'class-validator';

export class LoginUser {
  @IsEmail({}, { message: 'Invalid Email!' })
  email: string;
}
