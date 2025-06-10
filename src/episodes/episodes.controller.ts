import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { ConfigService } from '../config/config.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { IsPositivePipe } from 'src/pipes/is-positive.pipe';
import { ApiKeyGuard } from 'src/guards/api-key.guard';

//like middleware in laravel and it can be used on the whole controller or on the specific method
@UseGuards(ApiKeyGuard)
@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private ConfigService: ConfigService,
  ) {}
  @Get()
  findAll(
    @Query('sort')
    sort: 'asc' | 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) // make validation on the query param and set default value
    limit: number = 100,
  ) {
    console.log(sort); // d
    return this.episodesService.findAll(sort);
  }
  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }
  //adding validation on the body and it will use the class-validator library
  @Post()
  create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    return this.episodesService.create(input);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(id);
  }
}
