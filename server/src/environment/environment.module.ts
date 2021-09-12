import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { EnvironmentResolver } from './environment.resolver';
import { EnvironmentService } from './environment.service';
import { Environment } from './environment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Environment])],
  providers: [EnvironmentService, EnvironmentResolver],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
