import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users.repository';
import { NotFoundException } from '@nestjs/common';

const mockUsersRepository = () => ({
  getUsers: jest.fn(),
  findOneBy: jest.fn(),
});

const mockUserFilter = {
  search: '',
};

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('getUsers', () => {
    it('calls usersRepository.getUsers and returns the result', async () => {
      usersRepository.getUsers.mockResolvedValue('someValue');
      const result = await usersService.getUsers(mockUserFilter);
      expect(result).toEqual('someValue');
    });
  });

  describe('getUserById', () => {
    it('calls userService.getUserById and returns the result', async () => {
      const mockUser = {
        id: 'someId',
        username: 'test username',
        email: 'example@gmail.com',
        password: 'password',
      };
      usersRepository.findOneBy.mockResolvedValue(mockUser);
      const result = await usersService.getUserById('someId');
      expect(result).toEqual(mockUser);
    });

    it('calls userService.getUserById and handles an error', async () => {
      usersRepository.findOneBy.mockResolvedValue(null);
      expect(usersService.getUserById('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
