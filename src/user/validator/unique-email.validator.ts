import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'UniqueEmail', async: true })
export class UniqueEmail implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async validate(value: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email: value });
    return !user;
  }
  defaultMessage(): string {
    return 'Email in use';
  }
}
