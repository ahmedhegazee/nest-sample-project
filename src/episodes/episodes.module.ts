import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

@Module({
  imports: [ConfigModule],
  controllers: [EpisodesController],
  providers: [EpisodesService], //for injecting the service to the controller constructor
})
export class EpisodesModule {}
