import { IconButton, useColorScheme } from '@mui/joy';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';

const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  
  const handleToggle = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <IconButton variant="soft" onClick={handleToggle} aria-label="Toggle theme">
      {mode === 'dark' ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeToggle; 