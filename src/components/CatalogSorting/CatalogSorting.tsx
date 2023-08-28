import sortingDirections from 'constants/sortingDirections';
import { MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';

interface SortingProps {
  sortingPriceParameter: string;
  sortingNameParameter: string;
  onChangeSortingField: (value: string) => void;
  onChangeSortingDirection: (value: string) => void;
}

function CatalogSorting({
  sortingPriceParameter,
  sortingNameParameter,
  onChangeSortingField,
  onChangeSortingDirection,
}: SortingProps) {
  const changeSortingField = async (event: SelectChangeEvent) => {
    onChangeSortingField(event.target.value);
  };

  const changeSortingDirection = async (event: SelectChangeEvent) => {
    onChangeSortingDirection(event.target.value);
  };

  return (
    <Stack spacing={1}>
      <Typography>Sort by:</Typography>
      <Stack direction="row" spacing={1}>
        <Select fullWidth defaultValue={sortingNameParameter} onChange={changeSortingField}>
          <MenuItem value={sortingNameParameter}>Name</MenuItem>
          <MenuItem value={sortingPriceParameter}>Price</MenuItem>
        </Select>
        <Select fullWidth defaultValue={sortingDirections.ASC} onChange={changeSortingDirection}>
          <MenuItem value={sortingDirections.ASC}>{sortingDirections.ASC}</MenuItem>
          <MenuItem value={sortingDirections.DESC}>{sortingDirections.DESC}</MenuItem>
        </Select>
      </Stack>
    </Stack>
  );
}

export default CatalogSorting;
