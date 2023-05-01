import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { GetCatsFilterDto } from './dto/get-cats-filter.dto';
import { UpdateCatAvailabilityDto } from './dto/update-cat-availability.dto';
import { Cat } from './schemas/cat.schema';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';

@Controller('cats')
@UseGuards(AuthGuard())
export class CatsController {
  private logger = new Logger('CatsController');
  constructor(private readonly catsService: CatsService) {}

  @Post('create')
  async createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAllCats(@Query() filterDto: GetCatsFilterDto): Promise<Cat[]> {
    this.logger.verbose(JSON.stringify(filterDto));
    if (Object.keys(filterDto).length) {
      return this.catsService.getCatsWithFilters(filterDto);
    } else {
      return this.catsService.findAll();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOneCat(id);
  }

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

  @Patch('/:id/availability')
  async updateCatAvailability(
    @Param('id') id: string,
    @Body() updateCatAvailabilityDto: UpdateCatAvailabilityDto,
  ): Promise<Cat> {
    const { available } = updateCatAvailabilityDto;
    return this.catsService.updateCatAvailability(id, available);
  }
}
