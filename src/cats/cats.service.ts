import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Model } from 'mongoose';
import { Cat } from '../schemas/cat.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string) {
    return this.catModel.findById(id);
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catModel.findByIdAndUpdate(id, updateCatDto);
  }

  async deleteCat(id: string) {
    return this.catModel.findByIdAndRemove(id);
  }
}
