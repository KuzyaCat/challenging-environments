import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Environment } from './environment.entity';
import { GetEnvironmentArgs } from './dto/args/get-environment.args';
import { CreateEnvironmentInput } from './dto/input/create-environment.input';
import { DeleteEnvironmentInput } from './dto/input/delete-environment.input';
import { UpdateEnvironmentInput } from './dto/input/update-environment.input';

@Injectable()
export class EnvironmentService {
  constructor(@InjectRepository(Environment) private environmentRepository: Repository<Environment>) {}

  public create(createEnvironmentData: CreateEnvironmentInput): Promise<Environment> {
    const newEnvironment = this.environmentRepository.create(createEnvironmentData);
    return this.environmentRepository.save(newEnvironment);
  }

  public async update(updateEnvironmentData: UpdateEnvironmentInput): Promise<Environment> {
    const environment = await this.environmentRepository.findOne({
      where: {
        name: updateEnvironmentData.name,
        deleted: false
      }
    });

    if (environment) {
      return this.environmentRepository.save({
        ...environment,
        name: updateEnvironmentData.newName,
      });
    }

    return null;
  }

  public get(getEnvironmentArgs: GetEnvironmentArgs): Promise<Environment> {
    return this.environmentRepository.findOne(getEnvironmentArgs );
  }

  public getAll(): Promise<Environment[]> {
    return this.environmentRepository.find({ where: { deleted: false } });
  }

  public async delete(deleteEnvironmentData: DeleteEnvironmentInput): Promise<Environment> {
    const environment = await this.environmentRepository.findOne({
      where: { name: deleteEnvironmentData.name }
    });

    if (environment) {
      return this.environmentRepository.save({
        ...environment,
        deleted: true,
      });
    }

    return null;
  }
}
