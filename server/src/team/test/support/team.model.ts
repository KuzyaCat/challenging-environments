import { MockModel } from '../../../database/test/support/mock.model';
import { Team } from '../../team.entity';
import { teamStub } from '../stubs/team.stub';

export class TeamModel extends MockModel<Team> {
  protected entityStub = teamStub();
}

