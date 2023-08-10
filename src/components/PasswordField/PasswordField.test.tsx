import { render, screen } from '@testing-library/react';
import PasswordField from './PasswordField';

describe('PasswordField', () => {
  test('renders correctly (with default label)', () => {
    render(<PasswordField />);
    const passwordElement = screen.getByLabelText('Password');
    expect(passwordElement).toBeInTheDocument();
  });

  test('renders correctly (with custom label)', () => {
    render(<PasswordField label="Code" />);
    const passwordElement = screen.getByLabelText('Code');
    expect(passwordElement).toBeInTheDocument();
  });

  test('show error message', () => {
    const text = 'Houston, we have a problem!';
    render(<PasswordField isError errorMessage={text} />);
    const errorMessage = screen.getByText(text);
    expect(errorMessage).toBeInTheDocument();
  });
});
