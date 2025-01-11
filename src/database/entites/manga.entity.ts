import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  schema: 'public',
  name: 'manga',
})
export class Manga extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;
}
