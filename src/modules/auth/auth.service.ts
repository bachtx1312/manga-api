import { User } from '@/database/entites/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PasswordService } from '@/modules/utils/password.service';
import { RegisterReqDto, RegisterResDto } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  private _userRepository: Repository<User>;

  constructor(
    private _dataSource: DataSource,
    private _passwordService: PasswordService,
    private _jwtService: JwtService,
  ) {
    this._userRepository = _dataSource.getRepository(User);
  }

  async register(agrs: RegisterReqDto): Promise<RegisterResDto> {
    const existingUserByUsername = await this._userRepository.findOne({
      where: {
        username: agrs.username,
      },
    });

    if (existingUserByUsername) {
      throw new BadRequestException('user already exist!');
    }

    const hashedPassword = await this._passwordService.hashPassword(
      agrs.password,
    );

    const newUser = await this._userRepository.save({
      username: agrs.username,
      password: hashedPassword,
      displayName: agrs.displayName ?? agrs.username,
    });

    return {
      id: newUser.id,
      username: newUser.username,
      displayName: newUser.displayName,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  async login(username: string) {
    const payload = { username };
    return { access_token: this._jwtService.sign(payload) };
  }

  async validateUser(username: string, password: string) {
    const foundUser = await this._userRepository.findOne({
      where: {
        username: username,
      },
    });

    const throwLoginError = () => {
      throw new NotFoundException('incorrect username or password');
    };

    if (!foundUser) {
      throwLoginError();
    }

    const passwordMached = await this._passwordService.comparePassword(
      password,
      foundUser.password,
    );

    if (!passwordMached) {
      throwLoginError();
    }

    return foundUser;
  }
}
