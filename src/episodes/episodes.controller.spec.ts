import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;
  const mockFindOne = jest.fn();
  const mockEpisodeService = {
    findOne: mockFindOne,
    findAll: async () => [{ id: 'id' }],
    findFeatured: async () => [{ id: 'id' }],
    create: async () => ({ id: 'id' }),
  };
  beforeEach(async () => {
    jest.resetAllMocks(); //to reset the mock calls
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodesController],
      imports: [ConfigModule], //for injecting the service to the controller constructor
      // providers: [EpisodesService], //for injecting the service to the controller constructor
      providers: [{ provide: EpisodesService, useValue: mockEpisodeService }], //to mock the service
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of episodes', async () => {
      const result = await controller.findAll('asc');
      expect(result).toEqual([{ id: 'id' }]);
    });
  });
  describe('findFeatured', () => {
    it('should return an array of featured episodes', async () => {
      const result = await controller.findFeatured();
      expect(result).toEqual([{ id: 'id' }]);
    });
  });
  describe('findOne', () => {
    const mockEpisode = {
      id: 'id',
    };
    beforeEach(() => {
      mockFindOne.mockResolvedValue(mockEpisode); //to mock the function
    });
    it('should return an episode', async () => {
      const result = await controller.findOne('id');
      expect(result).toEqual({ id: 'id' });
    });
  });
});
