import { List } from "src/list/list.entity";
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

  @OneToMany(() => List, list => list.user)
  lists: List[];

  @Column({
    nullable: false,
    default: false,
  })
  authorize: boolean;
}