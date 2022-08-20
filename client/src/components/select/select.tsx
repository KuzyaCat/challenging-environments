import { FC } from 'react';
import { Select, MenuItem } from '@mui/material';

import { COLORS } from '../../common/colors';

import './select.css';

interface ISelectProps {
  list: string[];
  value: string;
  label: string;
}

export const AppSelect: FC<ISelectProps> = (props) => {
  const { list, value, label } = props;

  return (
    <Select
      sx={{
        height: '2.5em',
        border: `1px solid ${COLORS.BLUE}`,
        color: COLORS.BLUE,
        '& .MuiSelect-icon': {
          color: COLORS.BLUE,
        },
      }}
      value={value}
      label={label}
    >
      { list.map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>) }
    </Select>
  )
}
