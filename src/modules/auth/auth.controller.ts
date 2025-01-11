import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterReqDto } from './auth.interface';
import { Public } from '@/decorators/public-route.decorator';
import { LocalAuthGuard } from '@/guards/auth/local-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterReqDto) {
    return this._authService.register(body);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this._authService.login(req.user?.username);
  }
}
