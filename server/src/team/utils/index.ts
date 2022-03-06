import { Team } from '../team.entity';
import { SortBy } from '../../config/types.d';

export const getSortTeamsBy = (sortByField: string | undefined): SortBy<Team> => {
  switch (sortByField) {
    case 'points_earned':
      return 'points_earned';
    case 'points_difference':
      return 'points_difference';
    case 'wins':
      return 'wins';
    case 'evaluation':
    default:
      return 'evaluation';
  }
};
