import { PREDEFINED_CARDS } from '../data/cards';

export function generateRandomJellyAttributesAndCards() {
  let points = 18;
  let body = 1 + Math.floor(Math.random() * (Math.min(10, points - 2)));
  points -= body;
  let reflexes = 1 + Math.floor(Math.random() * (Math.min(10, points - 1)));
  points -= reflexes;
  let skill = points;
  if (skill > 10) {
    skill = 10;
    reflexes = Math.min(reflexes, 10);
    body = Math.min(body, 10);
  }
  const cardIds = PREDEFINED_CARDS.map(c => c.id);
  for (let i = cardIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardIds[i], cardIds[j]] = [cardIds[j], cardIds[i]];
  }
  return {
    body,
    reflexes,
    skill,
    cards: cardIds.slice(0, 4),
  };
} 