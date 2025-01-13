import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Genre } from './genre.entity';

@Entity({
  schema: 'public',
  name: 'mangas',
})
export class Manga extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  authorName: string;

  @ManyToMany(() => Genre)
  @JoinTable({ name: 'manga_genre' })
  genres: Genre[];
}
