import { fireEvent, render, screen } from '@testing-library/react';
import AttributesFilter from 'components/AttributesFilter';
import { AttributesList } from 'types/types';

const attributes: AttributesList = {
  color: new Set(['black', 'white']),
};

const onChangeSelectedAttribute = jest.fn();

describe('AttributesFilter', () => {
  test('renders correctly', () => {
    render(<AttributesFilter attributes={attributes} onChangeSelectedAttribute={onChangeSelectedAttribute} />);

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
    render(<AttributesFilter attributes={{}} onChangeSelectedAttribute={() => {}} />);
    const header = screen.queryByText('Filters:');
    expect(header).not.toBeInTheDocument();
  });
});
