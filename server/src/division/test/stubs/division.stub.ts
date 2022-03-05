import { Division } from '../../division.entity';
import { Environment } from '../../../environment/environment.entity';
import { environmentStub } from '../../../environment/test/stubs/environment.stub';

export const divisionStub = (): Division => {
  return {
    id: 1,
    name: 'Test country',
    environment: environmentStub(),
    tier: 1,
  }
}
