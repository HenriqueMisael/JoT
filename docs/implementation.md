# Implementation Guide

This document describes the implementation patterns and decisions used in the JoT application.

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks
│   │   └── ThemeToggle.tsx
│   ├── molecules/      # Simple combinations
│   │   ├── Searchbar.tsx
│   │   └── Searchbar.test.tsx
│   └── organisms/      # Complex components
│       └── Navbar.tsx
├── pages/              # Complete pages
│   ├── Home.tsx
│   ├── Preferences.tsx
│   └── JellyCollection.tsx   # Jelly Collection page
├── store.ts            # Zustand state management
├── i18n.ts             # Internationalization setup
├── main.tsx            # App entry point
├── App.tsx             # Main app component
└── test-setup.ts       # Test configuration
```

## Key Implementation Patterns

### State Management (Zustand)

**Store Organization:**
- Separate stores for different concerns (app state, language state)
- TypeScript interfaces for all state
- Persistence to localStorage with initialization on app load

**Example Pattern:**
```typescript
interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (language) => {
    localStorage.setItem('language', language);
    set({ language });
  },
}));
```

### Theme Management

**MUI Joy Integration:**
- Use MUI Joy's built-in theme system with `useColorScheme`
- Automatic persistence handled by MUI Joy
- No custom theme state needed in Zustand

**Theme Toggle Pattern:**
```typescript
const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  
  const handleToggle = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };
  // ...
};
```

### Component Architecture

**Atomic Design Implementation:**
- **Atoms**: Basic UI elements (buttons, inputs, icons)
- **Molecules**: Simple combinations (searchbar, theme toggle)
- **Organisms**: Complex components (navbar)
- **Pages**: Complete page components

**Component Guidelines:**
- Use MUI Joy components for consistent styling
- Implement proper TypeScript interfaces
- Follow DRY principles (single responsibility)
- Use proper ref forwarding for MUI Joy components

### Searchbar Implementation

**Key Features:**
- Global keyboard shortcut (Ctrl+K) using react-hotkeys-hook
- Page metadata with name, description, and route
- Keyboard navigation (arrow keys, enter, escape)
- Click outside to close
- Auto-clear and unfocus after navigation

**Search Logic:**
```typescript
const filteredPages = pages.filter(page => 
  page.name.toLowerCase().includes(query.toLowerCase()) ||
  page.description.toLowerCase().includes(query.toLowerCase())
);
```

### Testing Strategy

**Test Configuration:**
- Vitest with jsdom environment
- React Testing Library for component testing
- Proper mocking for external dependencies
- Test setup file for global configurations

**Testing Guidelines:**
- Test logic, not UI
- Mock external dependencies (react-hotkeys-hook)
- Test user interactions and state changes
- Use proper test utilities and matchers

### Internationalization

**Setup Pattern:**
- React-i18next with i18next-browser-languagedetector
- Zustand state management for language preference
- Automatic persistence and restoration
- Integration with MUI Joy components

**Language Management:**
```typescript
// Initialize from Zustand state
const { language } = useLanguageStore.getState();
i18n.changeLanguage(language);
```

## Common Patterns

### Ref Forwarding with MUI Joy

When working with MUI Joy components that need refs:

```typescript
<Input
  slotProps={{
    input: {
      ref: inputRef,
    },
  }}
/>
```

### Event Handling

For keyboard events and shortcuts:

```typescript
// Global shortcuts
useHotkeys('ctrl+k', (e) => {
  e.preventDefault();
  inputRef.current?.focus();
});

// Component keyboard events
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    e.stopPropagation();
    // Handle navigation
  }
};
```

### State Persistence

For Zustand stores with localStorage:

```typescript
const getInitialValue = () => {
  const stored = localStorage.getItem('key');
  return stored || defaultValue;
};

export const useStore = create<State>((set) => ({
  value: getInitialValue(),
  setValue: (newValue) => {
    localStorage.setItem('key', newValue);
    set({ value: newValue });
  },
}));
```

## Best Practices

1. **TypeScript**: Use strict typing, avoid `any` and `unknown`
2. **DRY**: Don't repeat code, create reusable functions
3. **Separation of Concerns**: Keep logic separate from UI
4. **Accessibility**: Use proper ARIA attributes and keyboard navigation
5. **Performance**: Use proper React patterns (useCallback, useMemo when needed)
6. **Testing**: Write tests for logic, not UI components
7. **Documentation**: Keep documentation updated with implementation changes 

## Styling Approach

The project uses a hybrid styling approach:
- **MUI Joy** is used for component-level styling, theming, and UI consistency.
- **Tailwind CSS** is used for utility-first layout, spacing, and responsive design.

**Usage Guidelines:**
- Use MUI Joy props and theming for component appearance, color schemes, and interactive states.
- Use Tailwind utility classes (via `className`) for layout, spacing, flex/grid, and responsive breakpoints.
- Tailwind and MUI Joy can be combined on the same element when needed.

**Example:**
```tsx
<Box className="min-h-screen p-8 flex flex-col items-center">
  <Button variant="solid">Click me</Button>
</Box>
```

This approach allows for rapid prototyping and fine-grained control over layout while maintaining a consistent look and feel with MUI Joy components. 