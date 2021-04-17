import { Users } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['userId', 'name'])
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

  @Column('int', { array: true, default: {} })
  elements: number[];
}