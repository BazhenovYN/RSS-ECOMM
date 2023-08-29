import { fireEvent, render, screen } from '@testing-library/react';
import SearchField from 'components/SearchField';

const onSearch = jest.fn();

describe('SearchField', () => {
  test('renders correctly', () => {
    render(<SearchField onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'test text' } });
    fireEvent.click(button);

    expect(onSearch).toBeCalledWith('test text');
  });
});
