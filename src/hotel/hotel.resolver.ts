import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HotelType } from './hotel.type';
import { HotelService } from './hotel.service';

@Resolver((of) => HotelType)
export class HotelResolver {
  constructor(private hotelService: HotelService) {}

  @Query((returns) => HotelType)
  hotel(@Args('id') id: string) {
    return this.hotelService.getHotel(id);
  }

  @Mutation((returns) => HotelType)
  createHotel(
    @Args('name') name: string,
    @Args('numberRooms') numberRooms: number,
    @Args('location') location: string,
    @Args('rating') rating: number,
  ) {
    return this.hotelService.createHotel(name, numberRooms, location, rating);
  }
}
