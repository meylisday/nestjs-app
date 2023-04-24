import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from '../../schemas/cat.schema';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async validate(value: any, args: ValidationArguments) {
    const [field] = args.constraints;
    console.log(this.catModel);
    const record = await this.catModel.findOne({ [field]: value });
    return !record;
  }

  defaultMessage(args: ValidationArguments) {
    const [field] = args.constraints;
    return `${field} must be unique`;
  }
}
