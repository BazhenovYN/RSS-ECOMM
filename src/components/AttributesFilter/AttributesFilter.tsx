import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { AttributesList, SelectedAttributesList } from 'types/types';
import { useState } from 'react';
import { RestartAlt } from '@mui/icons-material';

interface AttributesFilterProps {
  attributes: AttributesList;
  onChangeSelectedAttribute: (selectedAttributes: SelectedAttributesList) => void;
}

function AttributesFilter({ attributes, onChangeSelectedAttribute }: AttributesFilterProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributesList>({});
  const attributesKeys = Object.keys(attributes);

  const changeSelectedAttribute = (event: SelectChangeEvent) => {
    const newSelectedAttributes = { ...selectedAttributes, [event.target.name]: event.target.value };
    setSelectedAttributes(newSelectedAttributes);
    onChangeSelectedAttribute(newSelectedAttributes);
  };

  const resetSelectedAttributes = () => {
    setSelectedAttributes({});
    onChangeSelectedAttribute({});
  };

  return attributesKeys.length ? (
    <Stack spacing={1}>
      <Typography variant="h5">Filters:</Typography>
      {Object.keys(attributes).map((attributeName) => (
        <FormControl fullWidth key={attributeName}>
          <InputLabel id={attributeName}>{attributeName}</InputLabel>
          <Select
            value={selectedAttributes[attributeName] || ''}
            labelId={attributeName}
            label={attributeName}
            name={attributeName}
            onChange={changeSelectedAttribute}>
            {[...attributes[attributeName]].map((attributeValue) => (
              <MenuItem value={attributeValue} key={attributeValue}>
                {attributeValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>Reset filters:</Typography>
        <IconButton onClick={resetSelectedAttributes}>
          <RestartAlt />
        </IconButton>
      </Stack>
    </Stack>
  ) : null;
}

export default AttributesFilter;
