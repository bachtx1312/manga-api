import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GenreViewDto } from '../genre/genre.interface';
import { PartialType } from '@nestjs/swagger';
import { BaseViewModel } from '@/commons/base-model/base-model.interface';
import { Manga } from '@/database/entites/manga.entity';

export class MangaViewDto extends BaseViewModel {
  title: string;
  thumbnailUrl: string;
  description: string;
  authorName: string;
  genres: GenreViewDto[];

  constructor({
    id,
    title,
    authorName,
    description,
    thumbnailUrl,
    genres,
    createdAt,
    updatedAt,
    deletedAt,
  }: Omit<MangaViewDto, 'fromEntity'>) {
    super({ id, createdAt, updatedAt, deletedAt });
    this.title = title;
    this.authorName = authorName;
    this.description = description;
    this.thumbnailUrl = thumbnailUrl;
    this.genres = genres;
  }

  static fromEntity(entity: Manga) {
    return new MangaViewDto(entity);
  }
}

export class CreateMangaReqDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  thumbnailUrl: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  authorName: string;

  @IsArray()
  @IsNotEmpty()
  genres: string[];
}

export class UpdateMangaReqDto extends PartialType(CreateMangaReqDto) {}
