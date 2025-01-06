import { IsEmail, Validate } from 'class-validator';
import { UniqueEmail } from '../validator/unique-email.validator';

export class CreateUser {
  @IsEmail({}, { message: 'Invalid Email!' })
  @Validate(UniqueEmail)
  email: string;
}
