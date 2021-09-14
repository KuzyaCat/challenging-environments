import { regionStub } from '../test/stubs/region.stub';

export const RegionService = jest.fn().mockReturnValue({
  getAll: jest.fn().mockResolvedValue([regionStub()]),
});

