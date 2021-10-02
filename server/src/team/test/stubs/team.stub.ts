import { Team } from '../../team.entity';
import { Country } from '../../../country/country.entity';
import { countryStub } from '../../../country/test/stubs/country.stub';

export const createTeamStub = (): Team => {
  return {
    id: 1,
    name: 'Test team',
    country: countryStub(),
    logo: 'Test team logo',
  }
}

export const udpateTeamStub = (): Team => {
  return {
    id: 2,
    name: 'Test team',
    country: countryStub(),
    logo: 'Test team logo',
    active: true,
    evaluation: 0,
    matches: 0,
    wins: 0,
    draws: 0,
    loses: 0,
    points_earned: 0,
    enemy_points_earned: 0,
    points_difference: 0,
  }
}
