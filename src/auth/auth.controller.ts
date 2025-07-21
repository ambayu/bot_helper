import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,) { }

  @Get('login')
  login(@Body() body: { username: string, password: string }) {

    return this.authService.login(body.username, body.password)
  }
}
