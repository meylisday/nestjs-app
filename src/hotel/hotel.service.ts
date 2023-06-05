import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateHotelInput } from './hotel.input';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel) private hotelRepository: Repository<Hotel>,
  ) {}

  async getHotels(): Promise<Hotel[]> {
    console.log(await this.hotelRepository.find());
    return this.hotelRepository.find();
  }
  async createHotel(createHotelInput: CreateHotelInput): Promise<Hotel> {
    const { name, numberRooms, location, rating, rooms } = createHotelInput;

    const hotel = this.hotelRepository.create({
      id: uuid(),
      name,
      numberRooms,
      location,
      rating,
      rooms,
    });

    return this.hotelRepository.save(hotel);
  }

  async getHotel(id: string): Promise<Hotel> {
    return this.hotelRepository.findOneBy({ id });
  }

  async assignRoomsToHotel(
    hotelId: string,
    roomsIds: string[],
  ): Promise<Hotel> {
    const hotel = await this.hotelRepository.findOneBy({ id: hotelId });
    hotel.rooms = [...hotel.rooms, ...roomsIds];

    return this.hotelRepository.save(hotel);
  }
}
