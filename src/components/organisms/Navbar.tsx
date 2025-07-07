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
      className="flex items-center justify-between p-2 border-b"
      sx={{borderColor: 'divider'}}
    >
      <Typography className="flex-1" level="h4">
        {pageName}
      </Typography>
      <Box className="flex-1 flex justify-center">
        <Searchbar />
      </Box>
      <Box className="flex-1 flex justify-end">
        <ThemeToggle />
      </Box>
    </Box>
  );
};

export default Navbar; 