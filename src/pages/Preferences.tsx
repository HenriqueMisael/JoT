import { Box, Typography, FormControl, FormLabel, Select, Option } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store';
import ThemeToggle from '../components/atoms/ThemeToggle';

const Preferences = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageChange = (
    event: React.MouseEvent<Element> | React.KeyboardEvent<Element> | React.FocusEvent<Element> | null,
    newValue: 'en' | 'pt-BR' | 'fr-CA' | null
  ) => {
    if (newValue) {
      setLanguage(newValue);
      i18n.changeLanguage(newValue);
    }
  };

  return (
    <Box sx={{ color: 'text.primary' }}>
      <Typography level="h2" sx={{ color: 'text.primary', mb: 3 }}>
        Preferences
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography level="h4" sx={{ color: 'text.primary', mb: 2 }}>
            Theme
          </Typography>
          <ThemeToggle />
        </Box>
        
        <Box>
          <Typography level="h4" sx={{ color: 'text.primary', mb: 2 }}>
            Language
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <FormLabel sx={{ color: 'text.primary' }}>Select Language</FormLabel>
            <Select
              value={language}
              onChange={handleLanguageChange}
              sx={{ bgcolor: 'background.surface' }}
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