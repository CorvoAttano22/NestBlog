import { Article } from 'src/article/article.entity';
import { Token } from 'src/auth/token.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  handle: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  registrationToken: string;

  @Column({ nullable: true })
  loginToken: string;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => Token, (article) => article.user)
  articles: Article[];
}
