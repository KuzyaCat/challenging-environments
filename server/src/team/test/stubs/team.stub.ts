import { Team } from '../../team.entity';
import { Country } from '../../../country/country.entity';
import { countryStub } from '../../../country/test/stubs/country.stub';
import { divisionStub } from '../../../division/test/stubs/division.stub';
import { environmentStub } from '../../../environment/test/stubs/environment.stub';
import { regionStub } from '../../../region/test/stubs/region.stub';

export const teamStub = (): Team => {
  return {
    id: 2,
    name: 'Test team',
    country: countryStub(),
    division: divisionStub(),
    region: regionStub(),
    logo: 'Test team logo',
    environment: environmentStub(),
    active: true,
    evaluation: 0,
    matches: 0,
    wins: 0,
    draws: 0,
    loses: 0,
    points_earned: 0,
    enemy_points_earned: 0,
    points_difference: 0,
    isNational: false
  }
}
