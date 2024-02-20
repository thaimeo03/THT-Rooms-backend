import { Test, TestingModule } from '@nestjs/testing'
import { ChatGroupGateway } from './chat-group.gateway'

describe('ChatGroupGateway', () => {
  let gateway: ChatGroupGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGroupGateway]
    }).compile()

    gateway = module.get<ChatGroupGateway>(ChatGroupGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
