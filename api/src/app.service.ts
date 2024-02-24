import { Injectable } from '@nestjs/common';
import { HelloEntity } from './app.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HelloRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(HelloEntity)
    private readonly helloRepository: HelloRepository,
  ) {}

  async postHello(message: HelloEntity): Promise<HelloEntity> {
    return await this.helloRepository.save(message);
  }
}
