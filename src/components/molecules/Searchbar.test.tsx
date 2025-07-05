import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import i18n from '../../i18n';
import Searchbar from './Searchbar';

// Mock react-hotkeys-hook
vi.mock('react-hotkeys-hook', () => ({
  useHotkeys: vi.fn(),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </I18nextProvider>
  );
};

describe('Searchbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input with placeholder', () => {
    renderWithProviders(<Searchbar />);
    expect(screen.getByPlaceholderText('Search pages... (Ctrl+K)')).toBeInTheDocument();
  });

  it('shows dropdown when typing', () => {
    renderWithProviders(<Searchbar />);
    const input = screen.getByPlaceholderText('Search pages... (Ctrl+K)');
    
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'home' } });
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Home page containing dashboard information')).toBeInTheDocument();
  });

  it('filters pages by name', () => {
    renderWithProviders(<Searchbar />);
    const input = screen.getByPlaceholderText('Search pages... (Ctrl+K)');
    
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'preferences' } });
    
    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByText('Preference page containing basic user configurations')).toBeInTheDocument();
  });

  it('filters pages by description', () => {
    renderWithProviders(<Searchbar />);
    const input = screen.getByPlaceholderText('Search pages... (Ctrl+K)');
    
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'dashboard' } });
    
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('navigates to page when clicking on suggestion', () => {
    renderWithProviders(<Searchbar />);
    const input = screen.getByPlaceholderText('Search pages... (Ctrl+K)');
    
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'home' } });
    
    const homeButton = screen.getByText('Home').closest('[role="button"]');
    expect(homeButton).toBeInTheDocument();
    fireEvent.click(homeButton!);
    
    // Check that the input is cleared
    expect(input).toHaveValue('');
  });

  it('handles keyboard navigation with arrow keys', () => {
    renderWithProviders(<Searchbar />);
    const input = screen.getByPlaceholderText('Search pages... (Ctrl+K)');
    
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'h' } });
    
    // Press arrow down
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    // The first item should be selected (Home)
    const homeButton = screen.getByText('Home').closest('[role="button"]');
    expect(homeButton).toHaveAttribute('aria-selected', 'true');
  });

  it('handles escape key to close dropdown', () => {
    renderWithProviders(<Searchbar />);
    const input = screen.getByPlaceholderText('Search pages... (Ctrl+K)');
    
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'home' } });
    
    // Dropdown should be visible
    expect(screen.getByText('Home')).toBeInTheDocument();
    
    // Press escape
    fireEvent.keyDown(input, { key: 'Escape' });
    
    // Dropdown should be hidden
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });
}); 