import { DEFAULT_LANGUAGE } from 'constants/const';
import { fireEvent, render, screen } from '@testing-library/react';
import AttributesFilter from 'components/AttributesFilter';
import { AttributeDefinition } from '@commercetools/platform-sdk';

const attributes: AttributeDefinition[] = [
  {
    type: {
      name: 'enum',
      values: [
        { key: 'black', label: 'black' },
        { key: 'white', label: 'white' },
      ],
    },
    name: 'color',
    label: { 'en-US': 'color' },
    isRequired: false,
    attributeConstraint: 'None',
    inputHint: 'SingleLine',
    isSearchable: true,
  },
];

const onChangeSelectedAttribute = jest.fn();

describe('AttributesFilter', () => {
  test('renders correctly', () => {
    render(
      <AttributesFilter
        fetchedAttributes={attributes}
        onChangeSelectedAttribute={onChangeSelectedAttribute}
        language={DEFAULT_LANGUAGE}
      />
    );

    const header = screen.getByText('Filters:');
    expect(header).toBeInTheDocument();

    const field = screen.getByRole('button', { name: /color/i });
    expect(field).toBeInTheDocument();

    fireEvent.mouseDown(field);

    const blackOption = screen.getByText('black');
    expect(blackOption).toBeInTheDocument();

    const whiteOption = screen.getByText('white');
    expect(whiteOption).toBeInTheDocument();

    const resetButton = screen.getByTestId('reset-button');
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(whiteOption);
    expect(onChangeSelectedAttribute).toHaveBeenCalledWith({ color: 'white' });
  });

  test('renders no filter when attributes are empty', () => {
    render(
      <AttributesFilter fetchedAttributes={[]} onChangeSelectedAttribute={() => {}} language={DEFAULT_LANGUAGE} />
    );
    const header = screen.queryByText('Filters:');
    expect(header).not.toBeInTheDocument();
  });
});
