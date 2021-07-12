import React from 'react';
import { render, screen } from '@testing-library/react';
import ApplicationShell from './ApplicationShell';

test('renders learn react link', () => {
  render(<ApplicationShell />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
