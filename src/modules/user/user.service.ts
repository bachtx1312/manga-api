import { User } from '@/database/entites/user.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  private _userRepository: Repository<User>;

  constructor(private _dataSource: DataSource) {
    this._userRepository = _dataSource.getRepository(User);
  }

  async getUserInfoByUsername(username: string) {
    const foundUser = await this._userRepository.findOne({
      select: [
        'id',
        'username',
        'displayName',
        'avatar',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
      where: {
        username: username,
      },
    });

    return foundUser;
  }
}
