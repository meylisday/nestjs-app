import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Model, Types } from 'mongoose';
import { Cat } from './schemas/cat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { GetCatsFilterDto } from './dto/get-cats-filter.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async getCatsWithFilters(filterDto: GetCatsFilterDto): Promise<Cat[]> {
    const { available, search } = filterDto;

    let cats = await this.findAll();

    if (available) {
      const isAvailable = String(available) === 'true';
      cats = cats.filter((cat) => cat.available === isAvailable);
    }
    if (search) {
      cats = cats.filter((cat) => {
        if (
          cat.name.includes(search) ||
          cat.breed.includes(search) ||
          cat.age === +search
        ) {
          return true;
        }
        return false;
      });
    }
    return cats;
  }

  async findOneCat(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id);
    if (!cat) {
      throw new NotFoundException();
    }
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID');
    }
    const cat = await this.catModel.findByIdAndUpdate(id, updateCatDto, {
      new: true,
    });
    if (!cat) {
      throw new NotFoundException();
    }
    return cat;
  }

  async deleteCat(id: string): Promise<void> {
    const cat = await this.catModel.findByIdAndDelete(id);
    if (!cat) {
      throw new NotFoundException();
    }
  }

  async updateCatAvailability(id: string, available: boolean): Promise<Cat> {
    const updatedCat = await this.catModel.findOneAndUpdate(
      { _id: id },
      { available },
      { new: true },
    );
    return updatedCat;
  }
}
