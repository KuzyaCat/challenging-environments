import { MockModel } from '../../../database/test/support/mock.model';
import { Country } from '../../country.entity';
import { countryStub } from '../stubs/country.stub';

export class CountryModel extends MockModel<Country> {
  protected entityStub = countryStub();
}

