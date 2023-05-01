import { DataSource, Repository } from 'typeorm';
import { User } from '../entitites/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GetUsersFilterDto } from '../dto/get-users-filter.dto';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
import { error } from 'console';

@Injectable()
export class UsersRepository extends Repository<User> {
  private logger = new Logger(' UsersRepository', { timestamp: true });
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

    try {
      const users = query.getMany();
      return users;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks. Filters: ${filterDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      email,
      password: hashedPassword,
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
