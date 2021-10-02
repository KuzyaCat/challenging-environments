import { Country } from '../../country.entity';
import { Region } from '../../../region/region.entity';
import { regionStub } from '../../../region/test/stubs/region.stub';

export const countryStub = (): Country => {
  return {
    name: 'Test country',
    icon: 'Test country icon',
    region: regionStub,
  }
}

