import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './modules/health/health.controller';
import { HealthModule } from './modules/health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from './core/configs/system';
import { Manga } from './database/entites/manga.entity';
import { ChatModule } from './modules/chat/chat.module';
import { OpenAiModule } from './modules/open-ai/open-ai.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { UtilsModule } from './modules/utils/utils.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/auth/jwt-auth.guard';
import { JwtStrategy } from './passport/strategies/jwt.strategy';
import { LocalStrategy } from './passport/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './modules/user/user.module';

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = ENV.DATABASE;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TerminusModule,
    HealthModule,
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      username: DB_USER,
      password: DB_PASSWORD,
      entities: [Manga],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    ChatModule,
    OpenAiModule,
    AuthModule,
    UtilsModule,
    JwtModule.register({
      global: true,
      secret: ENV.JWT.SECRET,
      signOptions: { expiresIn: ENV.JWT.EXPIRES },
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
