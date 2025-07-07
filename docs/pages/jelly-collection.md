# Jelly Collection Page

Page for managing the user's collection of Jellies.

Route: `/collections/jellies`

## Purpose

Display, create, edit, and remove Jellies. Each Jelly is a custom entity with attributes and assigned cards.

## UI & Functionality

- **Grid of Jelly Cards**: Shows all user-created Jellies as cards in a responsive grid.
- **Jelly Card**: Displays:
  - Jelly name (optional, if implemented)
  - Attributes: `body`, `reflexes`, `skill` (visualized as 1–10 dots each, max sum 18)
  - Assigned cards (4 per jelly, shown as mini-cards or titles)
  - Edit and Remove actions (visible on hover)
- **Add Jelly**: Button to open the create modal.
- **Edit Jelly**: Opens modal pre-filled with jelly data.
- **Remove Jelly**: Prompts for confirmation before deletion.
- **Jelly Naming**: Each jelly can be given a custom name during creation or editing. The name is displayed in the collection grid and in the modal.
- **Keyboard Shortcuts**: The create/edit modal supports:
  - **Ctrl+Enter** (⌃⏎): Confirm/save
  - **Ctrl+Backspace** (⌃⌫): Cancel/close
  - Shortcut tips are shown on buttons using atomic key components for visual clarity.
- **Atomic Design**:
  - Attribute dots are implemented as an atom component (`AttributeDots`).
  - Card display in the modal and tooltips uses a molecule (`JellyCardDisplay`).
  - Keyboard shortcut tips use atomic key components (e.g., `CtrlKey`, `EnterKey`).
- **Card Tooltips**: In the collection grid, hovering a card shows a tooltip with the full card info (title, description, icons for damage/shield), matching the modal display.
- **Add/Random Jelly**: Buttons are always visible, and a random jelly can be generated with valid attributes and a default name.

## Implementation Notes

- **State Management**: Zustand is used for all jelly state, including naming and random generation.
- **Shortcuts**: All keyboard shortcuts are implemented using `react-hotkeys-hook` as per project standards, and are visually indicated using atomic key components.
- **Atomic/Molecular Components**: Attribute dots, card display, and shortcut tips are all implemented as atomic/molecular components for reusability and consistency.

## Create/Edit Jelly Modal

- **Attributes**: Select values for `body`, `reflexes`, `skill` (1–10 each, total ≤ 18), using dot-based sliders.
- **Card Assignment**: Select 4 cards from a predefined list. Each card shows:
  - Title
  - Description
  - Attributes: `damage` (red icon), `shield` (blue icon)
- **Validation**:
  - Exactly 4 cards must be assigned
  - Attribute sum must not exceed 18
- **Save/Cancel**: Save persists changes, Cancel closes modal.

## Data Model

- **Jelly**:
  - `id`: string
  - `body`: number (1–10)
  - `reflexes`: number (1–10)
  - `skill`: number (1–10)
  - `cards`: array of 4 card IDs
- **Card** (predefined):
  - `id`: string
  - `title`: string
  - `description`: string
  - `damage`: number (optional)
  - `shield`: number (optional)

## Persistence

- All jellies and their assignments are stored in `localStorage`.
- Predefined cards are static in code.

## Visuals

- Use MUI Joy components for all UI.
- Attribute icons/colors: red for damage, blue for shield (MUI Joy standard icons/colors).
- No custom styling beyond MUI Joy defaults, except for attribute icons. 