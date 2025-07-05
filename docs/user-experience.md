# User Experience

## Accessibility

- All form controls include proper labels and ARIA attributes
- Keyboard navigation support for all interactive elements
- Screen reader friendly with proper semantic HTML structure

### Responsive Design

- Mobile-first approach with responsive breakpoints
- Proper spacing and layout adjustments for different screen sizes
- Touch-friendly controls for mobile devices

## Main navbar

The application will be composed by a main navbar/title bar and the page below it. The navbar will always be displayed on top of the application, with the active page below it.

In the far left corner there will be the current page name

There will be a searchbar in the center of this navbar.

To the far right corner there will be a button to switch between dark and light theme.

### Searchbar

It can be focused by user click or pressing Ctrl+K. 

The user should be able to type pages name in the searchbar. The searchbar should display the name of the page and its description; the search should also match based on description, but prioritizing the name. Accepting one of the suggested pages should navigate to that page.

**Searchbar functionality:**
- **Focus**: Click or Ctrl+K shortcut
- **Search**: Type to filter pages by name or description
- **Navigation**: Arrow keys (up/down) to navigate suggestions
- **Selection**: Enter to select highlighted item, or click on any suggestion. It should unfocus after selection.
- **Close**: Escape key or click outside to close dropdown
- **Auto-clear**: Input clears and unfocuses after navigation

**Keyboard shortcuts:**
- `Ctrl+K`: Focus searchbar
- `Arrow Up/Down`: Navigate suggestions
- `Enter`: Select highlighted suggestion
- `Escape`: Close dropdown and blur input

### Theme Toggle

The theme toggle button in the navbar switches between light and dark themes. The theme preference is automatically saved to localStorage and restored on page load.

## Pages

The application will have many pages, which will each have a URL associated with it. Each page will be composed by a title, description and URL, which can have arguments or not

|Page Name|Description|Route|
|---|---|---|
|Home|Home page containing dashboard information|/|
|[Preferences](pages/preferences.md)|Preference page containing basic user configurations|/preferences|
