import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, Min, MinLength } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @MinLength(1)
  @Field()
  title: string;

  @IsNumber()
  @Min(1)
  @Field()
  number: number;

  @IsNumber()
  @Min(1)
  @Field()
  price: number;

  @IsBoolean()
  @Field()
  occupancy: boolean;
}
