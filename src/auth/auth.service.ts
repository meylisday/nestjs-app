import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entitites/user.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignInUserDto } from '../users/dto/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  async signIn(signInUserDto: SignInUserDto): Promise<{ accessToken: string }> {
    const { username, password } = signInUserDto;
    const user = await this.usersRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check you logic');
    }
  }
}
