import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Room')
export class RoomType {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  number: number;

  @Field()
  price: number;

  @Field()
  occupancy: boolean;
}
