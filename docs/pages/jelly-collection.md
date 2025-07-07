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