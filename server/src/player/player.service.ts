import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Player } from './player.entity';
import { Country } from '../country/country.entity';
import { Environment } from '../environment/environment.entity';
import { GetPlayersArgs } from './dto/args/get-players.args';
import { GetPlayerArgs } from './dto/args/get-player.args';
import { NotFoundException } from '../exceptions';
import { SortBy, SortOrder } from '../config/types.d';
import { getSortPlayersBy } from './utils';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(Environment) private environmentRepository: Repository<Environment>,
  ) {}

  public async getAll(getPlayersArgs: GetPlayersArgs): Promise<Player[]> {
    const { environment, limit, page, order, country, sortBy, role } = getPlayersArgs;
    const environmentObj: Environment | null = await this.environmentRepository.findOne({
      where: { name: environment, deleted: false }
    });

    if (!environmentObj) {
      throw new NotFoundException('Environment not found');
    }

    let countryObj: Country;
    if (country) {
      countryObj = await this.countryRepository.findOne({
        where: { name: country }
      });

      if (!countryObj) {
        throw new NotFoundException('Country not found');
      }
    }

    const sortPlayersBy: SortBy<Player> = getSortPlayersBy(sortBy);
    const sortOrder: SortOrder = order || 'DESC';
    const skip: number = (page - 1) * limit;

    return this.playerRepository.find({
      where: {
        environment: environmentObj.name,
        active: true,
        ...(role && { role }),
        ...(countryObj && { country: countryObj }),
      }, 
      relations: ['country'],
      order: {
        [sortPlayersBy]: sortOrder
      },
      skip,
      take: limit,
    });
  }

  public getById(getPlayerArgs: GetPlayerArgs): Promise<Player> {
    return this.playerRepository.findOne({ id: getPlayerArgs.id });
  }
}

