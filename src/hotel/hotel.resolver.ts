import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { HotelType } from './hotel.type';
import { HotelService } from './hotel.service';
import { CreateHotelInput } from './hotel.input';
import { AssignRoomsToHotelInput } from './assign-rooms-to-hotel.input';
import { RoomService } from '../room/room.service';
import { Hotel } from './hotel.entity';

@Resolver((of) => HotelType)
export class HotelResolver {
  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
  ) {}

  @Query((returns) => HotelType)
  hotel(@Args('id') id: string) {
    return this.hotelService.getHotel(id);
  }

  @Query(returns => [HotelType])
  hotels() {
    return this.hotelService.getHotels();
  }

  @Mutation((returns) => HotelType)
  createHotel(@Args('createHotelInput') createHotelInput: CreateHotelInput) {
    return this.hotelService.createHotel(createHotelInput);
  }

  @Mutation(returns => HotelType)
  assignRoomsToHotel(
    @Args('assignRoomsToHotelInput')
    assignRoomsToHotelInput: AssignRoomsToHotelInput,
  ) {
    const { hotelId, roomsIds } = assignRoomsToHotelInput;
    return this.hotelService.assignRoomsToHotel(hotelId, roomsIds);
  }

  @ResolveField()
  async rooms(@Parent() hotel: Hotel) {
    return this.roomService.getManyRooms(hotel.rooms);
  }
}
