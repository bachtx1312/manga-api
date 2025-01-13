import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateGenreReqDto,
  GenreViewDto,
  UpdateGenreReqDto,
} from './genre.interface';
import { DataSource, Repository } from 'typeorm';
import { Genre } from '@/database/entites/genre.entity';
import _ from 'lodash';
import { MangaViewDto } from '../manga/manga.interface';

@Injectable()
export class GenreService {
  private _genreRepository: Repository<Genre>;
  constructor(private _dataSource: DataSource) {
    this._genreRepository = _dataSource.getRepository(Genre);
  }
  async create(createGenreDto: CreateGenreReqDto) {
    const newGenre = await this._genreRepository.save({
      title: createGenreDto.title,
      description: createGenreDto.description,
    });

    return GenreViewDto.fromEntity(newGenre);
  }

  async findAll() {
    const genres = await this._genreRepository.find({
      where: {
        deletedAt: null,
      },
    });
    return genres.map(GenreViewDto.fromEntity);
  }

  async findOne(id: string) {
    const foundGenre = await this._genreRepository.findOne({
      where: {
        id,
      },
      relations: {
        mangas: true,
      },
    });

    if (!foundGenre) {
      throw new NotFoundException('genre not found');
    }

    const mangas = foundGenre.mangas.map(MangaViewDto.fromEntity);

    return GenreViewDto.fromEntity({ ...foundGenre, mangas });
  }

  async update(id: string, updateGenreDto: UpdateGenreReqDto) {
    const foundGenre = await this._findById(id);

    const genreToUpdate = _.assign(foundGenre, updateGenreDto);

    const updatedGenre = await this._genreRepository.save(genreToUpdate);
    return GenreViewDto.fromEntity(updatedGenre);
  }

  async remove(id: string) {
    await this._dataSource
      .createQueryBuilder()
      .update(Genre)
      .set({ deletedAt: () => 'NOW()' })
      .where('id = :id', { id })
      .execute();
    const updatedGenre = await this._findById(id);
    return GenreViewDto.fromEntity(updatedGenre);
  }

  private async _findById(id: string) {
    const foundGenre = await this._genreRepository.findOne({
      where: {
        id,
      },
    });

    if (!foundGenre) {
      throw new NotFoundException('genre not found');
    }
    return foundGenre;
  }
}
