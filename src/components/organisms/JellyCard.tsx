import React from 'react';
import { Typography, IconButton, Chip, Tooltip, Card, Box } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PsychologyIcon from '@mui/icons-material/Psychology';
import type { Jelly } from '../../store/jellyStore';
import type { Card as JellyCardType } from '../../data/cards';
import ShieldIcon from '@mui/icons-material/Shield';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import JellyCardDisplay from '../molecules/JellyCardDisplay';

interface JellyCardProps {
  jelly: Jelly;
  cards: JellyCardType[];
  onEdit: (jelly: Jelly) => void;
  onRemove: (id: string) => void;
}

const renderDots = (count: number, max: number = 10) => (
  <Box className="flex gap-1">
    {Array.from({ length: max }).map((_, i) => (
      <Box
        key={i}
        className={`w-3 h-3 rounded-full ${i < count ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}
      />
    ))}
  </Box>
);

const JellyCard: React.FC<JellyCardProps> = ({ jelly, cards, onEdit, onRemove }) => {
  const assignedCards = jelly.cards.map(cid => cards.find(c => c.id === cid)).filter(Boolean) as JellyCardType[];

  return (
    <Card variant="outlined" className="relative group transition-shadow hover:shadow-lg">
      <Box className="mb-2">
        <Typography level="h4" className="truncate" title={jelly.name || 'Jelly'}>
          {jelly.name ? jelly.name : 'Jelly'}
        </Typography>
      </Box>
      <Box className="mb-2 flex items-center gap-4">
        <Box className="flex items-center gap-1">
          <FitnessCenterIcon fontSize="small" />
          <Typography level="body-sm">{jelly.body}</Typography>
        </Box>
        <Box className="flex items-center gap-1">
          <DirectionsRunIcon fontSize="small" />
          <Typography level="body-sm">{jelly.reflexes}</Typography>
        </Box>
        <Box className="flex items-center gap-1">
          <PsychologyIcon fontSize="small" />
          <Typography level="body-sm">{jelly.skill}</Typography>
        </Box>
      </Box>
      <Box className="mb-2">
        <Typography level="body-sm">Cards</Typography>
        <Box className="flex flex-wrap gap-1">
          {assignedCards.map(card => (
            <Tooltip
              title={<JellyCardDisplay card={card} />}
              key={card.id}
            >
              <Chip size="sm" variant="soft">
                {card.title}
              </Chip>
            </Tooltip>
          ))}
        </Box>
      </Box>
      <Box className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <IconButton size="sm" onClick={() => onEdit(jelly)}>
          <EditIcon />
        </IconButton>
        <IconButton size="sm" color="danger" onClick={() => onRemove(jelly.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default JellyCard; 