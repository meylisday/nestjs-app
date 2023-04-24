import { IsBoolean, IsOptional } from 'class-validator';

export class GetCatsFilterDto {
  @IsOptional()
  available?: boolean;

  @IsOptional()
  search?: string;
}
