import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entitites/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    await this.usersRepository.delete(id);
  }

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersRepository.getUsers(filterDto);
  }
}
