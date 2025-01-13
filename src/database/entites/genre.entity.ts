import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Manga } from './manga.entity';

@Entity({
  schema: 'public',
  name: 'genres',
})
export class Genre extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Manga)
  @JoinTable({ name: 'manga_genre' })
  mangas: Manga[];
}
