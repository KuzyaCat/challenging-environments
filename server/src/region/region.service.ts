import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Region } from './region.entity';

@Injectable()
export class RegionService {
  constructor(@InjectRepository(Region) private regionRepository: Repository<Region>) {}

  public getAll(): Promise<Region[]> {
    return this.regionRepository.find();
  }
}

