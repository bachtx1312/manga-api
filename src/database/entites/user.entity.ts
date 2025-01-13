import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  schema: 'public',
  name: 'users',
})
export class User extends BaseEntity {
  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'timestamp', default: null, nullable: true })
  deletedAt: Date;
}
