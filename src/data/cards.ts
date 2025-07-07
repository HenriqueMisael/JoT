export type Card = {
  id: string;
  title: string;
  description: string;
  damage?: number;
  shield?: number;
};

export const PREDEFINED_CARDS: Card[] = [
  {
    id: 'bite',
    title: 'Bite',
    description: 'Bites the target to cause damage.',
    damage: 3,
  },
  {
    id: 'defend',
    title: 'Defend',
    description: 'Enters a defensive stance to gain shield.',
    shield: 4,
  },
  {
    id: 'scratch',
    title: 'Scratch',
    description: 'Scratches the target to cause damage.',
    damage: 2,
  },
  {
    id: 'slam',
    title: 'Slam',
    description: 'Slams into the target, causing damage and gaining shield.',
    damage: 2,
    shield: 2,
  },
  {
    id: 'dodge',
    title: 'Dodge',
    description: 'Quickly dodges to gain a small shield.',
    shield: 2,
  },
  {
    id: 'pierce',
    title: 'Pierce',
    description: 'Pierces the target for high damage.',
    damage: 4,
  },
]; 