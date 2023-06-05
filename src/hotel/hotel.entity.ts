import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Hotel {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  numberRooms: number;

  @Column()
  location: string;

  @Column()
  rating: number;

  @Column()
  rooms: string[];
}
