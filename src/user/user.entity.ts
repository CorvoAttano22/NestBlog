import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
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
}