import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];
  async findAll(sort: 'asc' | 'desc' = 'asc'): Promise<Episode[]> {
    const sortedEpisodes = this.episodes.sort((a: Episode, b: Episode) => {
      if (sort === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    return await Promise.resolve(sortedEpisodes);
  }
  async findFeatured(): Promise<Episode[]> {
    return await Promise.resolve(
      this.episodes.filter((episode) => episode.featured),
    );
  }
  async findOne(id: string): Promise<Episode> {
    const episode = await Promise.resolve(
      this.episodes.find((episode) => episode.id === id),
    );
    if (!episode) {
      // throw new Error('Episode not found');//throws 500 error
      // throw new HttpException('Episode not found', HttpStatus.NOT_FOUND);//custom exception
      throw new NotFoundException('Episode not found'); //predefined exception
    }
    return episode;
  }
  async create(createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    const newEpisode = {
      id: randomUUID(),
      ...createEpisodeDto,
    };
    this.episodes.push(newEpisode);
    return await Promise.resolve(newEpisode);
  }
}
