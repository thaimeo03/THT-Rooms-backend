import { Test, TestingModule } from '@nestjs/testing';
import { RoomStatesService } from './room-states.service';

describe('RoomStatesService', () => {
  let service: RoomStatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomStatesService],
    }).compile();

    service = module.get<RoomStatesService>(RoomStatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
