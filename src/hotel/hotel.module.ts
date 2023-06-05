import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { HotelResolver } from './hotel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Room } from 'src/room/room.entity';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mongodb',
          url: config.get('MONGODB_URI'),
          synchronize: true,
          useUnifiedTopology: true,
          entities: [Hotel, Room],
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Hotel]),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    RoomModule,
  ],
  providers: [HotelResolver, HotelService],
})
export class HotelModule {}
