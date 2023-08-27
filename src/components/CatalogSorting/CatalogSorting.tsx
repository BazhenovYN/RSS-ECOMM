import sortingDirections from 'constants/sortingDirections';
import { MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';

interface SortingProps {
  sortingFieldNameValue: string;
  sortingField: string;
  setSortingField: (value: string) => void;
  sortingDirection: string;
  setSortingDirection: (value: string) => void;
}

function CatalogSorting({
  sortingFieldNameValue,
  sortingField,
  setSortingField,
  sortingDirection,
  setSortingDirection,
}: SortingProps) {
  const changeSortingField = async (event: SelectChangeEvent) => {
    setSortingField(event.target.value);
  };

  const changeSortingDirection = async (event: SelectChangeEvent) => {
    setSortingDirection(event.target.value);
  };

  return (
    <Stack direction="row" alignItems="center" alignSelf="flex-end" spacing={1}>
      <Typography>Sorting:</Typography>
      <Select value={sortingField} onChange={changeSortingField}>
        <MenuItem value={sortingFieldNameValue}>Name</MenuItem>
        <MenuItem value="price">Price</MenuItem>
      </Select>
      <Select value={sortingDirection} onChange={changeSortingDirection}>
        <MenuItem value={sortingDirections.ASC}>{sortingDirections.ASC}</MenuItem>
        <MenuItem value={sortingDirections.DESC}>{sortingDirections.DESC}</MenuItem>
      </Select>
    </Stack>
  );
}

export default CatalogSorting;
