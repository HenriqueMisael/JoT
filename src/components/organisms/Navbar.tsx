import { Box, Typography } from '@mui/joy';
import ThemeToggle from '../atoms/ThemeToggle';
import Searchbar from '../molecules/Searchbar';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/preferences': 'Preferences',
  '/collections/jellies': 'Jelly Collection',
};

const Navbar = () => {
  const location = useLocation();
  const pageName = pageTitles[location.pathname] || '';

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        minHeight: 56,
        bgcolor: 'background.surface',
      }}
    >
      <Typography level="h4" sx={{ minWidth: 120, color: 'text.primary' }}>
        {pageName}
      </Typography>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Searchbar />
      </Box>
      <Box sx={{ minWidth: 120, display: 'flex', justifyContent: 'flex-end' }}>
        <ThemeToggle />
      </Box>
    </Box>
  );
};

export default Navbar; 