import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryColumn()
  token: string;
  
  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
