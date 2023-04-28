import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitites/user.entity';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'cats',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
