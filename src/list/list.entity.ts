import { Users } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lists {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Users, user => user.lists, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  user: Users;

  @Column('uuid')
  userId: Users['id'];

  @Column('simple-array')
  elements: number[];
}