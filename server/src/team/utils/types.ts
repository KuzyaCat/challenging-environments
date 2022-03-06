import { Team } from '../team.entity';
import { Country } from '../../country/country.entity';
import { Division } from '../../division/division.entity';

export type TeamWithJoins = Team & { country: Country } & { division: Division };
