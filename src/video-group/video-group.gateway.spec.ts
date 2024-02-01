import { Test, TestingModule } from '@nestjs/testing';
import { VideoGroupGateway } from './video-group.gateway';

describe('VideoGroupGateway', () => {
  let gateway: VideoGroupGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoGroupGateway],
    }).compile();

    gateway = module.get<VideoGroupGateway>(VideoGroupGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
