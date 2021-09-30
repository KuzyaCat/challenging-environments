import { Environment } from '../../environment.entity';

export const environmentStub = (): Environment => {
  return {
    name: 'Test environment',
    withTeams: true,
    withCountries: false,
    deleted: false
  }
}
