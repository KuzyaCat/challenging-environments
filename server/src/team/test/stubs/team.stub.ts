import { Team } from '../../team.entity';
import { Country } from '../../../country/country.entity';

export const createTeamStub = (country: Country): Team => {
  return {
    name: 'Test team',
    country,
  }
}

export const udpateTeamStub = (country: Country): Team => {
  return {
    name: 'Test team',
    country,
  }
}
