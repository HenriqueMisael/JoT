import React from 'react';
import { Box } from '@mui/joy';

interface ShortcutDecoratorProps {
  keys: string;
}

const ShortcutDecorator: React.FC<ShortcutDecoratorProps> = ({ keys }) => {
  return (
    <Box
      component="kbd"
      className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs font-mono font-normal tracking-wide border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200"
      style={{ fontWeight: 400, letterSpacing: '0.01em' }}
    >
      {keys}
    </Box>
  );
};

export const CtrlKey = () => <ShortcutDecorator keys="CTRL" />;
export const KKey = () => <ShortcutDecorator keys="K" />;
export const EnterKey = () => <ShortcutDecorator keys="⏎" />;
export const BackspaceKey = () => <ShortcutDecorator keys="⌫" />; 