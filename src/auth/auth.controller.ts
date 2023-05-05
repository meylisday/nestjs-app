import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../users/entitites/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { SignInUserDto } from '../users/dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(
    @Body() signInUserDto: SignInUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInUserDto);
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
