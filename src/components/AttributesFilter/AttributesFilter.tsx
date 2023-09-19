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
import { AttributesList, Language, SelectedAttributesList } from 'types/types';
import { useMemo, useState } from 'react';
import { RestartAlt } from '@mui/icons-material';
import { AttributeDefinition } from '@commercetools/platform-sdk';

interface AttributesFilterProps {
  fetchedAttributes: AttributeDefinition[];
  onChangeSelectedAttribute: (selectedAttributes: SelectedAttributesList) => void;
  language: Language;
}

function AttributesFilter({ fetchedAttributes, onChangeSelectedAttribute, language }: AttributesFilterProps) {
  const attributes = useMemo(() => {
    const resultAttributes: AttributesList = {};

    fetchedAttributes.forEach((attribute) => {
      const attributeName = attribute.name;
      if ('values' in attribute.type) {
        const attributeList = attribute.type.values.map((attributeValue) => {
          const attributeValueLabel = attributeValue.label;
          if (typeof attributeValueLabel === 'string') return attributeValueLabel;
          return attributeValueLabel[language];
        });
        if (resultAttributes[attributeName]) {
          attributeList.forEach((attributeValue) => resultAttributes[attributeName].list.add(attributeValue));
        } else {
          resultAttributes[attributeName] = { label: attribute.label[language], list: new Set(attributeList) };
        }
      }
    });

    return resultAttributes;
  }, [fetchedAttributes, language]);

  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributesList>({});
  const attributesNames = useMemo(() => Object.keys(attributes), [attributes]);

  const changeSelectedAttribute = (event: SelectChangeEvent) => {
    const newSelectedAttributes = { ...selectedAttributes, [event.target.name]: event.target.value };
    setSelectedAttributes(newSelectedAttributes);
    onChangeSelectedAttribute(newSelectedAttributes);
  };

  const resetSelectedAttributes = () => {
    if (!Object.keys(selectedAttributes).length) return;
    setSelectedAttributes({});
    onChangeSelectedAttribute({});
  };

  return attributesNames.length ? (
    <Stack spacing={1}>
      <Typography variant="h5">Filters:</Typography>
      {Object.keys(attributes)
        .sort()
        .map((attributeName) => {
          const selectedAttribute = selectedAttributes[attributeName];
          const attributeLabel = attributes[attributeName].label;
          return (
            <FormControl fullWidth key={attributeName}>
              <InputLabel id={attributeName}>{attributeLabel}</InputLabel>
              <Select
                value={selectedAttribute || ''}
                labelId={attributeName}
                label={attributeLabel}
                name={attributeName}
                onChange={changeSelectedAttribute}>
                {[...attributes[attributeName].list].map((attributeValue) => (
                  <MenuItem value={attributeValue} key={attributeValue}>
                    {attributeValue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        })}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>Reset filters:</Typography>
        <IconButton data-testid="reset-button" onClick={resetSelectedAttributes}>
          <RestartAlt />
        </IconButton>
      </Stack>
    </Stack>
  ) : null;
}

export default AttributesFilter;
