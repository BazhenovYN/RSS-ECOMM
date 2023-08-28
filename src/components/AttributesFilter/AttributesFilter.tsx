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
import { AttributesList, Product, SelectedAttributesList } from 'types/types';
import { useMemo, useState } from 'react';
import { RestartAlt } from '@mui/icons-material';

interface AttributesFilterProps {
  products: Product[];
  onChangeSelectedAttribute: (selectedAttributes: SelectedAttributesList) => void;
}

function AttributesFilter({ products, onChangeSelectedAttribute }: AttributesFilterProps) {
  const attributes = useMemo(() => {
    const currentAttributes: AttributesList = {};
    products.forEach((product) => {
      product.attributes?.forEach((productAttribute) => {
        if (!currentAttributes[productAttribute.name]) currentAttributes[productAttribute.name] = new Set();
        currentAttributes[productAttribute.name].add(productAttribute.value);
      });
    });
    return currentAttributes;
  }, [products]);
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributesList>({});

  const changeSelectedAttribute = (event: SelectChangeEvent) => {
    const newSelectedAttributes = { ...selectedAttributes, [event.target.name]: event.target.value };
    setSelectedAttributes(newSelectedAttributes);
    onChangeSelectedAttribute(newSelectedAttributes);
  };

  const resetSelectedAttributes = () => {
    setSelectedAttributes({});
    onChangeSelectedAttribute({});
  };

  return (
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
  );
}

export default AttributesFilter;
