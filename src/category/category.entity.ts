import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Unique,
  Column,
} from 'typeorm';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['name'])
  @Column()
  name: string;
}
