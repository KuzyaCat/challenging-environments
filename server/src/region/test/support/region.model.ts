import { MockModel } from '../../../database/test/support/mock.model';
import { Region } from '../../region.entity';
import { regionStub } from '../stubs/region.stub';

export class RegionModel extends MockModel<Region> {
  protected entityStub = regionStub();
}

