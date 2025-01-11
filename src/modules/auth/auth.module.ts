import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/database/entites/user.entity';
import { UtilsModule } from '@/modules/utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UtilsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
