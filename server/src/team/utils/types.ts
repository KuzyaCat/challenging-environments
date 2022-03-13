import { Team } from '../team.entity';
import { Country } from '../../country/country.entity';
import { Division } from '../../division/division.entity';
import { Player } from '../../player/player.entity';

export type TeamWithJoins = Team & { country: Country } & { division: Division };

export type ITeamDetails =  Team & { players: Player[] };
