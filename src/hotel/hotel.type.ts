import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoomType } from '../room/room.type';

@ObjectType('Hotel')
export class HotelType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  numberRooms: number;

  @Field()
  location: string;

  @Field()
  rating: number;

  @Field((type) => [RoomType])
  rooms: string[];
}
