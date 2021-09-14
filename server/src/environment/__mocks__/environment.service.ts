import { environmentStub } from '../test/stubs/environment.stub';

export const EnvironmentService = jest.fn().mockReturnValue({
  get: jest.fn().mockResolvedValue(environmentStub()),
  getAll: jest.fn().mockResolvedValue([environmentStub()]),
  create: jest.fn().mockResolvedValue(environmentStub()),
  update: jest.fn().mockResolvedValue(environmentStub()),
});
