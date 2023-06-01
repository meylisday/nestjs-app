import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { HotelResolver } from './hotel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
          entities: [Hotel],
        };
      },
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRootAsync({
    //   type: 'mongodb',
    //   url: 'mongodb://127.0.0.1:27017/hotel?readPreference=primary&ssl=false&directConnection=true',
    //   synchronize: true,
    //   useUnifiedTopology: true,
    //   entities: [Hotel],
    // }),
    TypeOrmModule.forFeature([Hotel]),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
  ],
  providers: [HotelResolver, HotelService],
})
export class HotelModule {}
