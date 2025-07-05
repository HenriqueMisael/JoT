# Technologies

This project should be built using the latest version of React in Vite.

## Routing and Navigation

It should support routing with React Router.

## Styling

It should use MUI Joy as the base UI framework since it's mainly a desktop application. The theme system should be properly configured with:
- Light and dark mode support
- Automatic theme persistence to localStorage
- Proper color scheme integration using MUI Joy's built-in themes
- CssBaseline for consistent styling

## Code

It should use TypeScript in all the code, enforcing types and making good use of types and interfaces. It shouldn't hold back on taking advantage of the flexibility of types, but it should all be used as necessary. `any` and `unknown` shouldn't be used.

## Test

It should include unit tests for code logic using Vitest and React Testing Library. Code logic should be well decoupled from the UI so it can be well tested. There's no need for unit tests for the UI since those only increase the cost of developing. E2E tests will be included in a later moment.

Test configuration should include:
- Vitest with jsdom environment
- React Testing Library for component testing
- Proper mocking for external dependencies (like react-hotkeys-hook)
- Test setup file for global configurations

## State management

The project should use Zustand for state management. For valid objects they should be saved to local storage and retrieved on page initialization of the application. The important designs from Zustand should be followed.

State should be organized by feature (e.g., language state, app state) and include:
- Proper TypeScript interfaces
- Persistence to localStorage
- Initialization from localStorage on app load
- Clean separation of concerns

## Architecture

The project should follow Atomic design for the UI:
- atoms: Basic building blocks (buttons, inputs, icons)
- molecules: Simple combinations of atoms (searchbar, theme toggle)
- organisms: Complex UI components (navbar)
- templates: Page layouts
- pages: Complete pages

## Shortcuts

It should use react-hotkeys-hook to handle shortcuts and not any JS native manipulation of the document or elements. The hook should be properly configured with appropriate options.

## Internationalization

It should use React-i18next for internationalization supporting English (standard), Brazilian Portuguese and Canadian French. Language state should be managed by Zustand and persisted to localStorage.

## Version control

It should use version control using Git. The development will be trunk-based, with the `main` branch serving as the trunk. Feature branches will be created from the `main` branch.