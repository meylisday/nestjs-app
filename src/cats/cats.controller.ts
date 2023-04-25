import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { GetCatsFilterDto } from './dto/get-cats-filter.dto';
import { UpdateCatAvailabilityDto } from './dto/update-cat-availability.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @UsePipes(new ValidationPipe())
  @Get()
  async findAllCats(@Query() filterDto: GetCatsFilterDto): Promise<Cat[]> {
    if (Object.keys(filterDto).length) {
      return this.catsService.getCatsWithFilters(filterDto);
    } else {
      return this.catsService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOneCat(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch('update/:id')
  async updateCat(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete('delete/:id')
  async deleteCat(@Param('id') id: string): Promise<void> {
    return this.catsService.deleteCat(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch('/:id/availability')
  async updateCatAvailability(
    @Param('id') id: string,
    @Body() updateCatAvailabilityDto: UpdateCatAvailabilityDto,
  ): Promise<Cat> {
    const { available } = updateCatAvailabilityDto;
    return this.catsService.updateCatAvailability(id, available);
  }
}
