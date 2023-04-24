import { IsBoolean } from 'class-validator';

export class UpdateCatAvailabilityDto {
  @IsBoolean()
  available: boolean;
}
