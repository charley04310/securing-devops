import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { HelloEntity } from './app.entity';

@Injectable()
export class HelloRepository extends Repository<HelloEntity> {
  constructor(private dataSource: DataSource) {
    super(HelloEntity, dataSource.createEntityManager());
  }
}
