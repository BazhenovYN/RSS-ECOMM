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
    <Stack direction="row" alignItems="center" alignSelf="flex-end" spacing={1}>
      <Typography>Sorting:</Typography>
      <Select defaultValue={sortingNameParameter} onChange={changeSortingField}>
        <MenuItem value={sortingNameParameter}>Name</MenuItem>
        <MenuItem value={sortingPriceParameter}>Price</MenuItem>
      </Select>
      <Select defaultValue={sortingDirections.ASC} onChange={changeSortingDirection}>
        <MenuItem value={sortingDirections.ASC}>{sortingDirections.ASC}</MenuItem>
        <MenuItem value={sortingDirections.DESC}>{sortingDirections.DESC}</MenuItem>
      </Select>
    </Stack>
  );
}

export default CatalogSorting;
