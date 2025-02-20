import React from 'react';
import { render, screen } from '@testing-library/react';
import BuyMeCoffee from '../BuyMeCoffee';

describe('BuyMeCoffee Component', () => {
  it('renders the Buy Me a Coffee button', () => {
    render(<BuyMeCoffee />);
    const button = screen.getByRole('link', { name: /buy me a coffee/i });
    expect(button).toBeInTheDocument();
  });

  it('has the correct link to buymeacoffee.com', () => {
    render(<BuyMeCoffee />);
    const link = screen.getByRole('link', { name: /buy me a coffee/i });
    expect(link).toHaveAttribute('href', 'https://buymeacoffee.com/Guillermolopez');
  });

  it('opens in a new tab with secure attributes', () => {
    render(<BuyMeCoffee />);
    const link = screen.getByRole('link', { name: /buy me a coffee/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('contains the coffee cup icon', () => {
    render(<BuyMeCoffee />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
}); 