import { FormControl, IconButton, InputLabel, OutlinedInput } from '@mui/material';
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
    <FormControl>
      <InputLabel htmlFor="search-field" id="search-label">
        Search
      </InputLabel>
      <OutlinedInput
        fullWidth
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        label="Search"
        id="search-field"
        endAdornment={
          <IconButton onClick={handleSubmit}>
            <Search />
          </IconButton>
        }
      />
    </FormControl>
  );
}

export default SearchField;
