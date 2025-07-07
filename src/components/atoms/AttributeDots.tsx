import React from 'react';
import { Box } from '@mui/joy';

interface AttributeDotsProps {
  value: number;
  max?: number;
  onChange?: (v: number) => void;
  className?: string;
}

const AttributeDots: React.FC<AttributeDotsProps> = ({ value, max = 10, onChange, className }) => (
  <Box className={`flex gap-1 mt-2 ${className ?? ''}`}>
    {Array.from({ length: max }).map((_, i) => (
      <Box
        key={i}
        className={`w-4 h-4 rounded-full border ${i < value ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-700'} ${onChange ? 'cursor-pointer' : ''}`}
        onClick={onChange ? () => onChange(i + 1) : undefined}
      />
    ))}
  </Box>
);

export default AttributeDots; 