# Preferences Page

Preference page containing basic user configurations

Route: `/preferences`

## General

### Theme

It should include a toggle for Light and Dark theme, mirroring the state of the button in the navbar. The theme toggle should:
- Use the same MUI Joy ThemeToggle component as the navbar
- Automatically persist theme preference to localStorage
- Restore theme preference on app initialization

### Language

It should be a dropdown with the available options:
- English (en)
- Portuguese - Brazil (pt-BR) 
- French - Canada (fr-CA)

The language selection should:
- Use MUI Joy Select component
- Update both Zustand state and i18n language
- Persist language preference to localStorage
- Restore language preference on app initialization
- Trigger immediate language change in the application
