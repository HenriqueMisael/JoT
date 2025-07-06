import { Box, Typography, FormControl, FormLabel, Select, Option } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store';
import ThemeToggle from '../components/atoms/ThemeToggle';

const Preferences = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageChange = (event: any, newValue: string | null) => {
    if (newValue) {
      setLanguage(newValue as any);
      i18n.changeLanguage(newValue);
    }
  };

  return (
    <Box>
      <Typography level="h2" className='mb-4'>
        Preferences
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography level="h4" sx={{  mb: 2 }}>
            Theme
          </Typography>
          <ThemeToggle />
        </Box>
        
        <Box>
          <Typography level="h4" sx={{ mb: 2 }}>
            Language
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <FormLabel>Select Language</FormLabel>
            <Select
              value={language}
              onChange={handleLanguageChange}
            >
              <Option value="en">English</Option>
              <Option value="pt-BR">Português (Brasil)</Option>
              <Option value="fr-CA">Français (Canada)</Option>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default Preferences; 