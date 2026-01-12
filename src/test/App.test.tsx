import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { AppProvider } from '../context/AppContext';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App Component', () => {
  it('renders onboarding by default if not completed', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );
    
    // Check if onboarding text is present in either English or Afrikaans
    expect(screen.getByText(/Choose your language|Kies jou taal/i)).toBeInTheDocument();
  });
});
