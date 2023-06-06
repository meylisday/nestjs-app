import { Field, InputType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignRoomsToHotelInput {
  @IsUUID()
  @Field((type) => ID)
  hotelId: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  roomsIds: string[];
}
