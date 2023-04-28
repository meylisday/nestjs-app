import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat, CatSchema } from './schemas/cat.schema';
import { IsUnique } from './dto/validators/is-unique.validator';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    AuthModule,
  ],
  controllers: [CatsController],
  providers: [CatsService, IsUnique],
})
export class CatsModule {}
