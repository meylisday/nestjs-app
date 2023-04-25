import { DataSource, Repository } from 'typeorm';
import { User } from '../entitites/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { GetUsersFilterDto } from '../dto/get-users-filter.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('user');

    if (search) {
      query.andWhere(
        'LOWER(user.username) LIKE LOWER(:search) OR LOWER(user.email) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    const users = query.getMany();
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const user = this.create({
      username,
      email,
      password,
    });
    await this.save(user);
    return user;
  }
}
