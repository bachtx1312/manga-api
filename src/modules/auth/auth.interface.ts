import { User } from '@/database/entites/user.entity';
import { Match } from '@/core/validators/match/match.decorator';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class RegisterReqDto {
  @IsNotEmpty()
  @Length(8, 64)
  username: string;

  @IsString()
  @IsOptional()
  displayName: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must bee at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.',
    },
  )
  password: string;

  @Match('password')
  confirmationPassword: string;
}

export class RegisterResDto extends PartialType(OmitType(User, ['password'])) {}
