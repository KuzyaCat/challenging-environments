import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Player } from './player.entity';
import { PlayerService } from './player.service';
import { GetPlayersArgs } from './dto/args/get-players.args';
import { GetPlayerArgs } from './dto/args/get-player.args';

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Query(() => Player, { name: 'player', nullable: true })
  getPlayer(@Args() getPlayerArgs: GetPlayerArgs): Promise<Player> {
    return this.playerService.getById(getPlayerArgs);
  }

  @Query(() => [Player], { name: 'players' })
  getPlayers(@Args() getPlayersArgs: GetPlayersArgs): Promise<Player[]> {
    return this.playerService.getAll(getPlayersArgs);
  }
}
