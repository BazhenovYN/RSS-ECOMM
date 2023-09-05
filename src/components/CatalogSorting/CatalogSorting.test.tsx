import SortingDirections from 'constants/sortingDirections';
import { fireEvent, render, screen } from '@testing-library/react';
import CatalogSorting from 'components/CatalogSorting';

const sortingProps = {
  sortingPriceParameter: 'price',
  sortingNameParameter: 'name',
  onChangeSortingField: jest.fn(),
  onChangeSortingDirection: jest.fn(),
};

describe('CatalogSorting', () => {
  test('renders correctly', () => {
    render(
      <CatalogSorting
        onChangeSortingDirection={sortingProps.onChangeSortingDirection}
        sortingNameParameter={sortingProps.sortingNameParameter}
        sortingPriceParameter={sortingProps.sortingPriceParameter}
        onChangeSortingField={sortingProps.onChangeSortingField}
      />
    );

    const header = screen.getByText('Sort by:');
    expect(header).toBeInTheDocument();

    const parameterField = screen.getByRole('button', { name: /name/i });
    expect(parameterField).toBeInTheDocument();
    fireEvent.mouseDown(parameterField);

    const priceOption = screen.getByRole('option', { name: /price/i });
    expect(priceOption).toBeInTheDocument();

    const directionField = screen.getByText(SortingDirections.ASC);
    expect(directionField).toBeInTheDocument();
    fireEvent.mouseDown(directionField);

    const descOption = screen.getByRole('option', { name: /desc/i });
    expect(descOption).toBeInTheDocument();
    fireEvent.click(descOption);

    expect(sortingProps.onChangeSortingDirection).toBeCalledWith('DESC');
  });
});
