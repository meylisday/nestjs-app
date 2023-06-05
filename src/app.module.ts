import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelModule } from './hotel/hotel.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [HotelModule, RoomModule],
})
export class AppModule {}
