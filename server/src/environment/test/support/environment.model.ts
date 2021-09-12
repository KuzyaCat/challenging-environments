import { MockModel } from '../../../database/test/support/mock.model';
import { Environment } from '../../environment.entity';
import { environmentStub } from '../stubs/environment.stub';

export class EnvironmentModel extends MockModel<Environment> {
  protected entityStub = environmentStub();
}
