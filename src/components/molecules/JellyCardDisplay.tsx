import React from 'react';
import { Box, Typography, Chip } from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';
import ShieldIcon from '@mui/icons-material/Shield';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import type { Card } from '../../data/cards';

interface JellyCardDisplayProps {
  card: Card;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const JellyCardDisplay: React.FC<JellyCardDisplayProps> = ({ card, selected, onClick, className }) => (
  <Box
    className={`border rounded-lg p-3 w-56 max-w-xs cursor-pointer flex flex-col gap-1 transition-shadow ${selected ? 'border-primary-500 bg-primary-50 dark:bg-primary-900' : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900'} ${className ?? ''}`}
    onClick={onClick}
  >
    <Typography level="title-sm" className="flex items-center gap-2">
      {card.title}
      {selected && <CheckIcon fontSize="small" />}
    </Typography>
    <Typography level="body-xs">{card.description}</Typography>
    <Box className="flex gap-2 mt-1">
      {card.damage && (
        <Chip color="danger" size="sm" startDecorator={<FlashOnIcon fontSize="small" />}>
          {card.damage}
        </Chip>
      )}
      {card.shield && (
        <Chip color="primary" size="sm" startDecorator={<ShieldIcon fontSize="small" />}>
          {card.shield}
        </Chip>
      )}
    </Box>
  </Box>
);

export default JellyCardDisplay; 