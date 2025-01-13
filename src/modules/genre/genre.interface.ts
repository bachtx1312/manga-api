import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { MangaViewDto } from '../manga/manga.interface';
import { BaseViewModel } from '@/commons/base-model/base-model.interface';
import { Genre } from '@/database/entites/genre.entity';

export class GenreViewDto extends BaseViewModel {
  id: string;
  title: string;
  description: string;
  mangas: MangaViewDto[];

  constructor({
    id,
    title,
    description,
    mangas,
    createdAt,
    updatedAt,
    deletedAt,
  }: Omit<GenreViewDto, 'fromEntity'>) {
    super({
      id,
      createdAt,
      updatedAt,
      deletedAt,
    });

    this.title = title;
    this.description = description;
    this.mangas = mangas;
  }

  static fromEntity(entity: Genre) {
    return new GenreViewDto(entity);
  }
}

export class CreateGenreReqDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateGenreReqDto extends PartialType(CreateGenreReqDto) {}
