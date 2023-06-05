import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomResolver } from './room.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomResolver, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
