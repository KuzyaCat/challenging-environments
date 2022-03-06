import { Player } from '../player.entity';
import { SortBy } from '../../config/types.d';

export const getSortPlayersBy = (sortByField: string | undefined): SortBy<Player> => {
  switch (sortByField) {
    case 'points_earned':
      return 'points_earned';
    case 'assists_earned':
      return 'assists_earned';
    case 'evaluation':
    default:
      return 'evaluation';
  }
};
