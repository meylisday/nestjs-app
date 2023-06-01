import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel) private hotelRepository: Repository<Hotel>,
  ) {}

  async createHotel(name, numberRooms, location, rating): Promise<Hotel> {
    const hotel = this.hotelRepository.create({
      id: uuid(),
      name,
      numberRooms,
      location,
      rating,
    });
    return this.hotelRepository.save(hotel);
  }

  async getHotel(id: string): Promise<Hotel> {
    return this.hotelRepository.findOneBy({ id });
  }
}
