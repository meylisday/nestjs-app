import { Field, InputType, ID } from '@nestjs/graphql';
import { IsNumber, IsUUID, Max, Min, MinLength } from 'class-validator';

@InputType()
export class CreateHotelInput {
  @MinLength(1)
  @Field()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @Field()
  numberRooms: number;

  @MinLength(1)
  @Field()
  location: string;

  @Min(1)
  @Max(5)
  @Field()
  rating: number;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  rooms: string[];
}
