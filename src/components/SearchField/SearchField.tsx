import { IconButton, OutlinedInput } from '@mui/material';
import { Search } from '@mui/icons-material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

interface SearchFieldProps {
  onSearch: (searchQuery: string) => void;
}

function SearchField({ onSearch }: SearchFieldProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = () => {
    onSearch(searchQuery);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSubmit();
  };

  return (
    <OutlinedInput
      fullWidth
      value={searchQuery}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      endAdornment={
        <IconButton onClick={handleSubmit}>
          <Search />
        </IconButton>
      }
    />
  );
}

export default SearchField;
