import { Lists } from "src/list/list.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Lists, list => list.user)
  lists: Lists[];

  @Column({
    nullable: false,
    default: false,
  })
  authorize: boolean;
}