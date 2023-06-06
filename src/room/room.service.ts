import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository, In } from 'typeorm';
import { CreateRoomInput } from './create-room.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  async getRoom(id: string): Promise<Room> {
    return this.roomRepository.findOneBy({ id });
  }

  async createRoom(createRoomInput: CreateRoomInput): Promise<Room> {
    const { title, number, price, occupancy } = createRoomInput;
    const room = this.roomRepository.create({
      id: uuid(),
      title,
      number,
      price,
      occupancy,
    });
    return this.roomRepository.save(room);
  }

  async getRooms(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async getManyRooms(roomsIds: string[]): Promise<Room[]> {
    return this.roomRepository.find({
      where: {
        id: {
          $in: [...roomsIds],
        } as any,
      },
    });
  }
}
