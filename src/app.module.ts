import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // MongooseModule.forRoot(
    //   'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false&directConnection=true',
    //   {
    //     dbName: 'cats',
    //   },
    // ),
    // CatsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
