import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateMangaReqDto,
  MangaViewDto,
  UpdateMangaReqDto,
} from './manga.interface';
import { DataSource, In, Repository } from 'typeorm';
import { Manga } from '@/database/entites/manga.entity';
import { Genre } from '@/database/entites/genre.entity';
import { GenreViewDto } from '../genre/genre.interface';
import _ from 'lodash';

@Injectable()
export class MangaService {
  private _mangaRepository: Repository<Manga>;
  private _genreRepository: Repository<Genre>;

  constructor(private _dataSource: DataSource) {
    this._mangaRepository = _dataSource.getRepository(Manga);
    this._genreRepository = _dataSource.getRepository(Genre);
  }

  async create(createMangaDto: CreateMangaReqDto) {
    const { title, authorName, description, genres, thumbnailUrl } =
      createMangaDto;
    if (!genres || genres.length === 0) {
      this._throwGenreCannotEmpty();
    }
    const genresData = await this._getGenresInIds(genres);

    if (genresData.length === 0) {
      this._throwGenreCannotEmpty();
    }

    const newManga = await this._mangaRepository.save({
      title,
      description,
      authorName,
      thumbnailUrl,
      genres: genresData,
    });

    const mappedGenresData = genresData.map(GenreViewDto.fromEntity);

    return MangaViewDto.fromEntity({ ...newManga, genres: mappedGenresData });
  }

  async findAll() {
    const mangas = await this._mangaRepository.find({
      where: {
        deletedAt: null,
      },
    });
    return mangas.map(MangaViewDto.fromEntity);
  }

  async findOne(id: string) {
    const foundManga = await this._mangaRepository.findOne({
      where: {
        id,
      },
      relations: {
        genres: true,
      },
    });

    if (!foundManga) {
      this._throwMangaNotFound();
    }

    const mappedGenres = foundManga.genres.map(GenreViewDto.fromEntity);

    return MangaViewDto.fromEntity({ ...foundManga, genres: mappedGenres });
  }

  async update(id: string, updateMangaDto: UpdateMangaReqDto) {
    const foundManga = await this._findById(id);
    if (!updateMangaDto.genres || updateMangaDto.genres.length === 0) {
      this._throwGenreCannotEmpty();
    }

    const genresToUpdate = await this._getGenresInIds(updateMangaDto.genres);
    delete updateMangaDto.genres;
    const mangaToUpdate = _.assign(foundManga, updateMangaDto, {
      genres: genresToUpdate,
    });
    const updatedManga = await this._genreRepository.save(mangaToUpdate);
    const mappedGenresData = genresToUpdate?.map(GenreViewDto.fromEntity);
    return MangaViewDto.fromEntity({
      ...updatedManga,
      genres: mappedGenresData,
    });
  }

  async remove(id: string) {
    await this._dataSource
      .createQueryBuilder()
      .update(Manga)
      .set({ deletedAt: () => 'NOW()' })
      .where('id = :id', { id })
      .execute();
    const updatedManga = await this._findById(id);
    return MangaViewDto.fromEntity(updatedManga);
  }

  private async _findById(id: string) {
    const foundGenre = await this._mangaRepository.findOne({
      where: {
        id,
      },
    });

    if (!foundGenre) {
      throw new NotFoundException('manga not found');
    }
    return foundGenre;
  }

  private async _getGenresInIds(ids: string[]) {
    return await this._genreRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  private _throwMangaNotFound() {
    throw new NotFoundException('manga not found');
  }
  private _throwGenreCannotEmpty() {
    throw new BadRequestException("genres can't be empty");
  }
}
