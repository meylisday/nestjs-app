import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoomType } from './room.type';
import { CreateRoomInput } from './create-room.input';
import { RoomService } from './room.service';

@Resolver((of) => RoomType)
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @Query((returns) => RoomType)
  async room(@Args('id') id: string) {
    return this.roomService.getRoom(id);
  }

  @Query((returns) => [RoomType])
  async rooms() {
    return this.roomService.getRooms();
  }
  @Mutation((returns) => RoomType)
  async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomService.createRoom(createRoomInput);
  }
}
