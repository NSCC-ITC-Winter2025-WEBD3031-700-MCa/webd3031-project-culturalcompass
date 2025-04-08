import React from 'react'; // 👈 ADD THIS LINE
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import Hero from '@/components/Home/Hero';
import { useRouter } from 'next/navigation';

// Mock Next.js router

jest.mock('next/navigation', () => ({

  useRouter: jest.fn(),

}));
 
// Mock your countries data

jest.mock('@/app/api/data', () => ({

  Countriess: [

    {

      countries: [

        { name: 'Japan' },

        { name: 'Canada' },

        { name: 'Australia' },

      ],

    },

  ],

}));
 
// Extend Jest expect with accessibility matchers

expect.extend(toHaveNoViolations);
 
describe('Hero Component', () => {

  const mockPush = jest.fn();

  beforeEach(() => {

    (useRouter as jest.Mock).mockReturnValue({

      push: mockPush,

    });

  });
 
  afterEach(() => {

    jest.clearAllMocks();

  });
 
  it('renders without crashing', () => {

    render(<Hero />);

  // ✅ Use RegExp to match the heading text, even with span inside
  expect(screen.getByText(/Your New Destination/)).toBeInTheDocument();

  });
 
  it('loads and displays countries in dropdown', async () => {

    render(<Hero />);

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(3);

    expect(options[0]).toHaveValue('Japan');

    expect(options[1]).toHaveValue('Canada');

    expect(options[2]).toHaveValue('Australia');

  });
 
  it('submits selected country', async () => {

    render(<Hero />);

    const select = screen.getByRole('combobox', { name: /destination/i });

    fireEvent.change(select, { target: { value: 'Canada' } });

    fireEvent.click(screen.getByRole('button', { name: /search now/i }));
 
    expect(mockPush).toHaveBeenCalledWith('/showCountries?country=Canada');

  });
 
  it('passes accessibility checks', async () => {

    const { container } = render(<Hero />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();

  });

});
 