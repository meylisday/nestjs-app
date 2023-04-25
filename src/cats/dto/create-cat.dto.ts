import { IsBoolean, IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { IsUnique } from './validators/is-unique.validator';

export class CreateCatDto {
  @IsNotEmpty()
  @Validate(IsUnique, ['name'], {
    message: 'Name already exists',
  })
  name: string;

  @IsNumber()
  age: number;

  breed: string;

  @IsBoolean()
  available: boolean;
}
