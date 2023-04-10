import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['name'])
  @Column()
  name: string;

  @Column({ name: 'price' })
  price: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
    name: 'createdDate',
  })
  createdAt: string;

  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
    name: 'updatedDate',
  })
  updatedAt: string;
}
